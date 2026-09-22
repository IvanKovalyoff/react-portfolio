// Pure data (no asset imports) so both the app and the Playwright layout
// suite can read it.
//
// Every Hero photo is stored trimmed to the subject's bounding box
// (src/assets/Hero/photos/trimmed). `aspect` is width / height of that trimmed
// image. `face` is the "keep-out" zone around the head (hair, face, chin) as
// fractions of the image, measured with a face detector and padded a little.
// Nothing but the photo itself may be drawn over that rectangle.

export interface FaceZone {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface HeroPhotoGeometry {
  aspect: number;
  face: FaceZone;
}

export const HERO_PHOTO_GEOMETRY: Record<string, HeroPhotoGeometry> = {
  basic: { aspect: 0.5475, face: { left: 0.237, top: 0, right: 0.709, bottom: 0.283 } },
  orange: { aspect: 0.6696, face: { left: 0.174, top: 0, right: 0.681, bottom: 0.369 } },
  green: { aspect: 0.7426, face: { left: 0.257, top: 0, right: 0.736, bottom: 0.392 } },
  red: { aspect: 1.2512, face: { left: 0.289, top: 0, right: 0.687, bottom: 0.554 } },
  blue: { aspect: 0.8281, face: { left: 0.309, top: 0, right: 0.733, bottom: 0.381 } },
  purple: { aspect: 1.3812, face: { left: 0.401, top: 0.066, right: 0.62, bottom: 0.406 } },
};
