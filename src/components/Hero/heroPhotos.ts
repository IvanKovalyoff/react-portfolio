import photoBasic from '../../assets/Hero/photos/trimmed/photo_Basic_nobg.webp';
import photoBlazeVector from '../../assets/Hero/photos/trimmed/photo_Blaze-Vector.webp';
import photoMatrixGreen from '../../assets/Hero/photos/trimmed/photo_Matrix-Green.webp';
import photoInfernoRed from '../../assets/Hero/photos/trimmed/photo_Inferno-Red.webp';
import photoQuantumBlue from '../../assets/Hero/photos/trimmed/photo_Quantum-Blue.webp';
import photoPlasmaPurple from '../../assets/Hero/photos/trimmed/photo_Plasma-Purple.webp';
import { HERO_PHOTO_GEOMETRY } from './heroFaceZones';

export interface HeroPhoto {
  src: string;
  /** width / height of the trimmed image; drives the layout maths in hero.css */
  aspect: number;
  /** intrinsic pixel size, only used for the <img width/height> attributes */
  width: number;
  height: number;
}

const photo = (theme: string, src: string, width: number, height: number): HeroPhoto => ({
  src,
  aspect: HERO_PHOTO_GEOMETRY[theme].aspect,
  width,
  height,
});

export const heroPhotos: Record<string, HeroPhoto> = {
  basic: photo('basic', photoBasic, 657, 1200),
  orange: photo('orange', photoBlazeVector, 681, 1017),
  green: photo('green', photoMatrixGreen, 825, 1111),
  red: photo('red', photoInfernoRed, 1355, 1083),
  blue: photo('blue', photoQuantumBlue, 843, 1018),
  purple: photo('purple', photoPlasmaPurple, 1413, 1023),
};
