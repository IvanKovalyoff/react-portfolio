import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { HERO_PHOTO_GEOMETRY } from '../src/components/Hero/heroFaceZones';

/**
 * Hero layout guard.
 *
 * For every theme, on a wide range of screen sizes and in all three
 * languages, this checks that the headline, subheadline and socials
 *
 *  - stay inside the Hero stage and never overlap each other,
 *  - never touch the photo (socials may sit on the photo, but never on the face),
 *  - never touch the padded face keep-out zone of the photo,
 *
 * and that the photo and the text stay big enough to be useful.
 */

const THEMES = Object.keys(HERO_PHOTO_GEOMETRY);
const LANGUAGES = ['en', 'pl', 'uk'] as const;

// [width, height] in CSS pixels: small/large phones, tablets, phones in
// landscape, laptops and desktops, plus a few awkward near-square windows.
const VIEWPORTS: Array<[number, number]> = [
  [320, 568],
  [360, 640],
  [375, 667],
  [390, 844],
  [412, 915],
  [430, 932],
  [600, 960],
  [768, 1024],
  [820, 1180],
  [1024, 1366],
  [568, 320],
  [667, 375],
  [740, 360],
  [844, 390],
  [932, 430],
  [800, 800],
  [1000, 900],
  [1024, 600],
  [1024, 768],
  [1280, 600],
  [1280, 720],
  [1366, 768],
  [1440, 900],
  [1536, 864],
  [1895, 945],
  [1920, 1080],
  [2560, 1440],
];

const FACE_MARGIN = 6; // px of breathing room around the face zone
const TOLERANCE = 1; // px: sub-pixel rounding is not an overlap
const MIN_PHOTO_SHARE = 0.3; // photo height / stage height on portrait stages
const MIN_TITLE_PX = 18;
const MIN_SUB_PX = 11;

interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface Measurement {
  stage: Box;
  photo: Box;
  greeting: Box;
  title: Box;
  sub: Box;
  socials: Box;
  socialsIn: string;
  titlePx: number;
  subPx: number;
  landscape: boolean;
}

type GameStoreWindow = Window & {
  __gameStore: { setState: (state: { currentTheme: string }) => void };
};

const measure = async (page: Page, theme: string): Promise<Measurement> => {
  await page.evaluate((id) => {
    (window as unknown as GameStoreWindow).__gameStore.setState({ currentTheme: id });
  }, theme);

  return page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const get = (id: string) => document.querySelector<HTMLElement>(`[data-testid="${id}"]`)!;
    const box = (rect: DOMRect): Box => ({
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
    });
    // Tight box around the rendered glyph lines rather than the whole block.
    const textBox = (el: HTMLElement): Box => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return box(range.getBoundingClientRect());
    };

    const img = get('hero-photo') as HTMLImageElement;
    await img.decode();
    const rect = img.getBoundingClientRect();
    const style = getComputedStyle(img);
    // object-fit: contain -> the picture is scaled to fit and positioned by object-position
    const scale = Math.min(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
    const width = img.naturalWidth * scale;
    const height = img.naturalHeight * scale;
    const [px, py] = style.objectPosition.split(' ').map((v) => parseFloat(v) / 100);
    const left = rect.left + (rect.width - width) * px;
    const top = rect.top + (rect.height - height) * py;

    const layout = get('hero-stage').firstElementChild as HTMLElement;
    return {
      stage: box(get('hero-stage').getBoundingClientRect()),
      photo: { left, top, right: left + width, bottom: top + height },
      greeting: textBox(get('hero-greeting')),
      title: textBox(get('hero-title')),
      sub: textBox(get('hero-sub')),
      socials: box(get('hero-socials').getBoundingClientRect()),
      socialsIn: layout.dataset.socIn ?? '',
      titlePx: parseFloat(getComputedStyle(get('hero-title')).fontSize),
      subPx: parseFloat(getComputedStyle(get('hero-sub')).fontSize),
      landscape: get('hero-stage').clientWidth >= get('hero-stage').clientHeight,
    };
  });
};

const overlap = (a: Box, b: Box) => ({
  x: Math.min(a.right, b.right) - Math.max(a.left, b.left),
  y: Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top),
});
const intersects = (a: Box, b: Box) => {
  const { x, y } = overlap(a, b);
  return x > TOLERANCE && y > TOLERANCE;
};
const inside = (outer: Box, inner: Box) =>
  inner.left >= outer.left - TOLERANCE &&
  inner.top >= outer.top - TOLERANCE &&
  inner.right <= outer.right + TOLERANCE &&
  inner.bottom <= outer.bottom + TOLERANCE;

const fmt = (b: Box) =>
  `[${Math.round(b.left)},${Math.round(b.top)} - ${Math.round(b.right)},${Math.round(b.bottom)}]`;

const faceBox = (theme: string, photo: Box): Box => {
  const { face } = HERO_PHOTO_GEOMETRY[theme];
  const w = photo.right - photo.left;
  const h = photo.bottom - photo.top;
  return {
    left: photo.left + face.left * w - FACE_MARGIN,
    top: photo.top + face.top * h - FACE_MARGIN,
    right: photo.left + face.right * w + FACE_MARGIN,
    bottom: photo.top + face.bottom * h + FACE_MARGIN,
  };
};

const violationsFor = (theme: string, m: Measurement): string[] => {
  const problems: string[] = [];
  const texts = { greeting: m.greeting, title: m.title, sub: m.sub };
  const face = faceBox(theme, m.photo);

  for (const [name, box] of Object.entries({ ...texts, socials: m.socials, photo: m.photo })) {
    if (!inside(m.stage, box)) {
      problems.push(`${name} ${fmt(box)} sticks out of the Hero ${fmt(m.stage)}`);
    }
  }

  const items = Object.entries({ ...texts, socials: m.socials });
  items.forEach(([nameA, a], index) => {
    items.slice(index + 1).forEach(([nameB, b]) => {
      // greeting and headline are stacked in one block; their glyph boxes may
      // touch by a hair, which is not a collision.
      if (nameA === 'greeting' && nameB === 'title') return;
      if (intersects(a, b)) problems.push(`${nameA} ${fmt(a)} overlaps ${nameB} ${fmt(b)}`);
    });
    if (intersects(a, face)) problems.push(`${nameA} ${fmt(a)} covers the face ${fmt(face)}`);
  });

  for (const [name, box] of Object.entries(texts)) {
    if (intersects(box, m.photo)) {
      problems.push(`${name} ${fmt(box)} overlaps the photo ${fmt(m.photo)}`);
    }
  }

  if (m.titlePx < MIN_TITLE_PX) problems.push(`headline is only ${m.titlePx}px`);
  if (m.subPx < MIN_SUB_PX) problems.push(`subheadline is only ${m.subPx}px`);

  const photoShare = (m.photo.bottom - m.photo.top) / (m.stage.bottom - m.stage.top);
  if (!m.landscape && photoShare < MIN_PHOTO_SHARE) {
    problems.push(`photo is only ${Math.round(photoShare * 100)}% of the Hero height`);
  }

  return problems;
};

for (const [width, height] of VIEWPORTS) {
  test.describe(`${width}x${height}`, () => {
    test.use({ viewport: { width, height } });

    for (const language of LANGUAGES) {
      test(`Hero layout is clean in ${language}`, async ({ page }, testInfo) => {
        await page.addInitScript((lng) => localStorage.setItem('i18nextLng', lng), language);
        await page.goto('/');
        await page.waitForFunction(() => (window as Partial<GameStoreWindow>).__gameStore);

        const report: string[] = [];
        for (const theme of THEMES) {
          const problems = violationsFor(theme, await measure(page, theme));
          if (problems.length > 0) {
            report.push(`${theme}: ${problems.join('; ')}`);
            await testInfo.attach(`${theme}.png`, {
              body: await page.screenshot(),
              contentType: 'image/png',
            });
          }
        }

        const overflowX = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        if (overflowX > 0) report.push(`page scrolls sideways by ${overflowX}px`);

        expect(report, report.join('\n')).toEqual([]);
      });
    }
  });
}
