import logoBasic from '../../assets/Logos/logo_Basic.webp';
import logoBlazeVector from '../../assets/Logos/logo_Blaze-Vector.webp';
import logoMatrixGreen from '../../assets/Logos/logo_Matrix-Green.webp';
import logoInfernoRed from '../../assets/Logos/logo_Inferno-Red.webp';
import logoQuantumBlue from '../../assets/Logos/logo_Quantum-Blue.webp';
import logoPlasmaPurple from '../../assets/Logos/logo_Plasma-Purple.webp';

export interface HeaderThemeStyle {
  logo: string;
  gradient: string;
  text: string;
  hoverText: string;
  bar: string;
  switcherBg: string;
  switcherText: string;
}

export const headerThemeStyles: Record<string, HeaderThemeStyle> = {
  basic: {
    logo: logoBasic,
    gradient: 'from-zinc-50 via-white to-zinc-100',
    text: 'text-zinc-800',
    hoverText: 'hover:text-zinc-400',
    bar: 'bg-zinc-800',
    switcherBg: 'bg-zinc-100',
    switcherText: 'text-zinc-800',
  },
  orange: {
    logo: logoBlazeVector,
    gradient: 'bg-gradient-to-l from-orange-600 via-[#cc4e00] to-black',
    text: 'text-[#ffbd59]',
    hoverText: 'hover:text-white',
    bar: 'bg-zinc-900',
    switcherBg: 'bg-gradient-to-b from-[var(--color-accent)] to-[#7a2f00]',
    switcherText: 'text-[#ffbd59]',
  },
  green: {
    logo: logoMatrixGreen,
    gradient: 'bg-gradient-to-r from-[#18370b] to-[#00b303]',
    text: 'text-[#d3ff99]',
    hoverText: 'hover:text-lime-300',
    bar: 'bg-lime-300',
    switcherBg: 'bg-gradient-to-b from-[#00b303] to-[#2e6417]',
    switcherText: 'text-[#d3ff99]',
  },
  red: {
    logo: logoInfernoRed,
    gradient: 'bg-gradient-to-l from-[#ff0000] to-[#000000]',
    text: 'text-[#ffc2c2]',
    hoverText: 'hover:text-orange-200',
    bar: 'bg-red-50',
    switcherBg: 'bg-gradient-to-b from-[#ff0000] to-[#7a0000]',
    switcherText: 'text-[#ffc2c2]',
  },
  blue: {
    logo: logoQuantumBlue,
    gradient: 'from-indigo-950 via-blue-800 to-blue-500',
    text: 'text-[#c2f6ff]',
    hoverText: 'hover:text-cyan-200',
    bar: 'bg-blue-50',
    switcherBg: 'bg-gradient-to-b from-blue-500 to-blue-800',
    switcherText: 'text-[#c2f6ff]',
  },
  purple: {
    logo: logoPlasmaPurple,
    gradient: 'from-purple-950 via-fuchsia-800 to-purple-600',
    text: 'text-[#c2cdff]',
    hoverText: 'hover:text-fuchsia-200',
    bar: 'bg-fuchsia-50',
    switcherBg: 'bg-gradient-to-b from-purple-600 to-purple-950',
    switcherText: 'text-[#c2cdff]',
  },
};
