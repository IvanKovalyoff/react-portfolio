import { allThemes } from '../../data/gameThemes';
import {
  getCompactSocialsDirection,
  getSocialsPlacement,
  heroCompositions,
  type HeroComposition,
} from './heroCompositions';
import { HERO_PHOTO_GEOMETRY } from './heroFaceZones';
import { heroPhotos } from './heroPhotos';
import { heroThemeStyles } from './heroThemeStyles';

const themeIds = allThemes.map((theme) => theme.id);

const withSocials = (
  base: HeroComposition,
  socials: HeroComposition['socials']
): HeroComposition => ({ ...base, socials });

describe('hero data is complete for every theme', () => {
  it.each(themeIds)('%s has a composition, style, photo and face zone', (id) => {
    expect(heroCompositions[id]).toBeDefined();
    expect(heroThemeStyles[id]).toBeDefined();
    expect(heroPhotos[id]).toBeDefined();
    expect(HERO_PHOTO_GEOMETRY[id]).toBeDefined();
  });

  it.each(themeIds)('%s has sane numbers', (id) => {
    const { titleScale, photoMaxWidth } = heroCompositions[id];
    const { face, aspect } = HERO_PHOTO_GEOMETRY[id];

    expect(titleScale).toBeGreaterThan(0.03);
    expect(titleScale).toBeLessThan(0.1);
    expect(photoMaxWidth).toBeGreaterThan(0.2);
    expect(photoMaxWidth).toBeLessThanOrEqual(0.7);
    expect(aspect).toBeGreaterThan(0);
    expect(face.left).toBeGreaterThanOrEqual(0);
    expect(face.right).toBeLessThanOrEqual(1);
    expect(face.left).toBeLessThan(face.right);
    expect(face.top).toBeGreaterThanOrEqual(0);
    expect(face.bottom).toBeLessThanOrEqual(1);
    expect(face.top).toBeLessThan(face.bottom);
  });

  it.each(themeIds)('%s has four social icons', (id) => {
    expect(heroThemeStyles[id].icons).toHaveLength(4);
  });
});

describe('getSocialsPlacement', () => {
  const photoOnLeft = heroCompositions.basic;

  it('puts socials in the text column when their corner is on the far side from the photo', () => {
    const composition = withSocials(photoOnLeft, { corner: 'bottom-right', direction: 'row' });

    expect(getSocialsPlacement(composition)).toBe('text');
  });

  it('puts a horizontal row on the photo side in the photo column', () => {
    const composition = withSocials(photoOnLeft, { corner: 'bottom-left', direction: 'row' });

    expect(getSocialsPlacement(composition)).toBe('photo');
  });

  it('lays a vertical strip over the photo corner', () => {
    const composition = withSocials(photoOnLeft, { corner: 'bottom-left', direction: 'col' });

    expect(getSocialsPlacement(composition)).toBe('overlay');
  });
});

describe('getCompactSocialsDirection', () => {
  const base = heroCompositions.basic;
  const compact = (socials: HeroComposition['socials']) =>
    getCompactSocialsDirection(withSocials(base, socials));

  it('uses the row-shaped twin of the direction by default', () => {
    expect(compact({ corner: 'bottom-left', direction: 'row' })).toBe('row');
    expect(compact({ corner: 'bottom-left', direction: 'col' })).toBe('row');
    expect(compact({ corner: 'bottom-left', direction: 'row-reverse' })).toBe('row-reverse');
    expect(compact({ corner: 'bottom-left', direction: 'col-reverse' })).toBe('row-reverse');
  });

  it('lets a theme choose its own fallback', () => {
    expect(
      compact({ corner: 'bottom-left', direction: 'col', compactDirection: 'row-reverse' })
    ).toBe('row-reverse');
  });

  it('makes blue fall back to row-reverse when its column does not fit', () => {
    expect(heroCompositions.blue.socials.direction).toBe('col');
    expect(getCompactSocialsDirection(heroCompositions.blue)).toBe('row-reverse');
  });
});
