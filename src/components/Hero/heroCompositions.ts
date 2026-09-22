export type PhotoSide = 'left' | 'right';
export type Align = 'left' | 'center' | 'right';
export type SocialsCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type SocialsDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse';
export type SocialsRowDirection = 'row' | 'row-reverse';

/**
 * Art direction for one Hero theme. The layout itself (grid, fluid type,
 * photo sizing) is shared and lives in hero.css; a composition only picks
 * between the few arrangements that CSS knows about.
 *
 * Landscape stages (width >= height): photo in one column, text in the other.
 * Portrait stages: one column, text above the photo ("top") or headline /
 * photo / subheadline ("sandwich").
 */
export interface HeroComposition {
  /** Column the photo takes on landscape stages. */
  photoSide: PhotoSide;
  /**
   * "flush": a cut-off shot that sits on the bottom edge of the stage.
   * "framed": a self-contained picture (hexagon, rounded frame) centred in its cell.
   */
  photoFit: 'flush' | 'framed';
  /** Largest share of the stage width the photo may occupy on landscape stages. */
  photoMaxWidth: number;
  /** Portrait arrangement. */
  portrait: 'top' | 'sandwich';
  portraitPhotoAlign: Align;
  portraitTextAlign: Align;
  socials: {
    corner: SocialsCorner;
    direction: SocialsDirection;
    /**
     * Row the socials use where a vertical strip does not fit (portrait
     * stages and landscape stages shorter than 21rem). Optional: by default
     * "col" becomes "row" and "col-reverse" becomes "row-reverse".
     */
    compactDirection?: SocialsRowDirection;
  };
  /**
   * Headline font-size as a share of the text column width. Depends on how
   * wide the theme's font is (monospace fonts need a smaller factor).
   */
  titleScale: number;
}

export const heroCompositions: Record<string, HeroComposition> = {
  basic: {
    photoSide: 'left',
    photoFit: 'flush',
    photoMaxWidth: 0.4,
    portrait: 'top',
    portraitPhotoAlign: 'left',
    portraitTextAlign: 'right',
    socials: { corner: 'bottom-right', direction: 'row' },
    titleScale: 0.062,
  },
  orange: {
    photoSide: 'right',
    photoFit: 'flush',
    photoMaxWidth: 0.42,
    portrait: 'top',
    portraitPhotoAlign: 'right',
    portraitTextAlign: 'left',
    socials: { corner: 'bottom-left', direction: 'row-reverse' },
    titleScale: 0.072,
  },
  green: {
    photoSide: 'right',
    photoFit: 'framed',
    photoMaxWidth: 0.44,
    portrait: 'sandwich',
    portraitPhotoAlign: 'center',
    portraitTextAlign: 'center',
    socials: { corner: 'bottom-right', direction: 'row' },
    titleScale: 0.07,
  },
  red: {
    photoSide: 'left',
    photoFit: 'flush',
    photoMaxWidth: 0.58,
    portrait: 'top',
    portraitPhotoAlign: 'center',
    portraitTextAlign: 'center',
    socials: { corner: 'bottom-left', direction: 'row-reverse' },
    titleScale: 0.07,
  },
  blue: {
    photoSide: 'left',
    photoFit: 'flush',
    photoMaxWidth: 0.48,
    portrait: 'top',
    portraitPhotoAlign: 'center',
    portraitTextAlign: 'right',
    socials: { corner: 'bottom-left', direction: 'col', compactDirection: 'row-reverse' },
    titleScale: 0.066,
  },
  purple: {
    photoSide: 'right',
    photoFit: 'framed',
    photoMaxWidth: 0.58,
    portrait: 'sandwich',
    portraitPhotoAlign: 'center',
    portraitTextAlign: 'center',
    socials: { corner: 'top-left', direction: 'row-reverse' },
    titleScale: 0.07,
  },
};

/** The row-shaped direction the socials fall back to when a column does not fit. */
export const getCompactSocialsDirection = (composition: HeroComposition): SocialsRowDirection => {
  const { direction, compactDirection } = composition.socials;
  return compactDirection ?? (direction.endsWith('reverse') ? 'row-reverse' : 'row');
};

export type SocialsPlacement = 'text' | 'photo' | 'overlay';

/**
 * Where the socials sit on landscape stages: in the text column, in the photo
 * column (below/above the picture) or, for vertical strips that would eat the
 * picture's height, laid over the photo's outer corner.
 */
export const getSocialsPlacement = (composition: HeroComposition): SocialsPlacement => {
  const [, horizontal] = composition.socials.corner.split('-');
  if (horizontal !== composition.photoSide) return 'text';
  return composition.socials.direction.startsWith('col') ? 'overlay' : 'photo';
};
