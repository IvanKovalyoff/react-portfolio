import bgBlazeVector from '../../assets/Hero/BG/bg_Blaze-Vector.webp';
import bgInfernoRed from '../../assets/Hero/BG/bg_Inferno-Red.webp';
import bgMatrixGreen from '../../assets/Hero/BG/bg_Matrix-Green.webp';
import bgPlasmaPurple from '../../assets/Hero/BG/bg_Plasma-Purple.webp';
import bgQuantumBlue from '../../assets/Hero/BG/bg_Quantum-Blue.webp';

import iconBasic1 from '../../assets/Hero/icons/icons_Basic/1.png';
import iconBasic2 from '../../assets/Hero/icons/icons_Basic/2.png';
import iconBasic3 from '../../assets/Hero/icons/icons_Basic/3.png';
import iconBasic4 from '../../assets/Hero/icons/icons_Basic/4.png';

import iconBlazeVector1 from '../../assets/Hero/icons/icons_Blaze-Vector/1.png';
import iconBlazeVector2 from '../../assets/Hero/icons/icons_Blaze-Vector/2.png';
import iconBlazeVector3 from '../../assets/Hero/icons/icons_Blaze-Vector/3.png';
import iconBlazeVector4 from '../../assets/Hero/icons/icons_Blaze-Vector/4.png';

import iconMatrixGreen1 from '../../assets/Hero/icons/icons_Matrix-Green/1.png';
import iconMatrixGreen2 from '../../assets/Hero/icons/icons_Matrix-Green/2.png';
import iconMatrixGreen3 from '../../assets/Hero/icons/icons_Matrix-Green/3.png';
import iconMatrixGreen4 from '../../assets/Hero/icons/icons_Matrix-Green/4.png';

import iconInfernoRed1 from '../../assets/Hero/icons/icons_Inferno-Red/1.png';
import iconInfernoRed2 from '../../assets/Hero/icons/icons_Inferno-Red/2.png';
import iconInfernoRed3 from '../../assets/Hero/icons/icons_Inferno-Red/3.png';
import iconInfernoRed4 from '../../assets/Hero/icons/icons_Inferno-Red/4.png';

import iconQuantumBlue1 from '../../assets/Hero/icons/icons_Quantum-Blue/1.png';
import iconQuantumBlue2 from '../../assets/Hero/icons/icons_Quantum-Blue/2.png';
import iconQuantumBlue3 from '../../assets/Hero/icons/icons_Quantum-Blue/3.png';
import iconQuantumBlue4 from '../../assets/Hero/icons/icons_Quantum-Blue/4.png';

import iconPlasmaPurple1 from '../../assets/Hero/icons/icons_Plasma-Purple/1.png';
import iconPlasmaPurple2 from '../../assets/Hero/icons/icons_Plasma-Purple/2.png';
import iconPlasmaPurple3 from '../../assets/Hero/icons/icons_Plasma-Purple/3.png';
import iconPlasmaPurple4 from '../../assets/Hero/icons/icons_Plasma-Purple/4.png';

// Gradients copied as a starting point from headerThemeStyles.
// Kept as a separate interface/source of truth so the Hero can evolve its
// own gradients (or other background treatments) independently later.
export type Color = `#${string}`;

export interface HeroThemeStyle {
  gradient: string;
  bgImage: string | Color;
  icons: [string, string, string, string];
  textClass: string;
}

export const heroThemeStyles: Record<string, HeroThemeStyle> = {
  basic: {
    gradient: 'bg-gradient-to-r from-zinc-50 via-white to-zinc-100',
    bgImage: '#27272a',
    icons: [iconBasic1, iconBasic2, iconBasic3, iconBasic4],
    textClass: 'text-white',
  },
  orange: {
    gradient: 'bg-gradient-to-r from-orange-600 to-black',
    bgImage: bgBlazeVector,
    icons: [iconBlazeVector1, iconBlazeVector2, iconBlazeVector3, iconBlazeVector4],
    textClass: 'text-white',
  },
  green: {
    gradient: 'bg-gradient-to-l from-[#18370b] to-[#00b303]',
    bgImage: bgMatrixGreen,
    icons: [iconMatrixGreen1, iconMatrixGreen2, iconMatrixGreen3, iconMatrixGreen4],
    textClass: 'text-white',
  },
  red: {
    gradient: 'bg-gradient-to-r from-[#ff0000] to-[#000000]',
    bgImage: bgInfernoRed,
    icons: [iconInfernoRed1, iconInfernoRed2, iconInfernoRed3, iconInfernoRed4],
    textClass: 'text-white',
  },
  blue: {
    gradient: 'bg-gradient-to-l from-indigo-950 via-blue-800 to-blue-500',
    bgImage: bgQuantumBlue,
    icons: [iconQuantumBlue1, iconQuantumBlue2, iconQuantumBlue3, iconQuantumBlue4],
    textClass: 'text-white',
  },
  purple: {
    gradient: 'bg-gradient-to-l from-purple-950 via-fuchsia-800 to-purple-600',
    bgImage: bgPlasmaPurple,
    icons: [iconPlasmaPurple1, iconPlasmaPurple2, iconPlasmaPurple3, iconPlasmaPurple4],
    textClass: 'text-white',
  },
};
