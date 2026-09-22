// Innermost card in the MyProjects stack (ComplexCourseCard > CourseCard > ProjectCard).
// Kept slightly lighter/more opaque than CourseCard so nested cards read as "closer".
export interface ProjectCardThemeStyle {
  textClass: string;
  chipTextColor: string;
  cardBg: string;
  cardBorder: string;
}

export const projectCardThemeStyles: Record<string, ProjectCardThemeStyle> = {
  basic: {
    textClass: 'text-zinc-800',
    chipTextColor: 'text-black',
    cardBg: 'bg-zinc-50 shadow-sm',
    cardBorder: 'border border-zinc-200',
  },
  orange: {
    textClass: 'text-[#ffbd59]',
    chipTextColor: 'text-[#ffe8d8]',
    cardBg: 'bg-white/15 backdrop-blur-sm shadow-md',
    cardBorder: 'border border-white/20',
  },
  green: {
    textClass: 'text-[#d3ff99]',
    chipTextColor: 'text-[#d3ff99]',
    cardBg: 'bg-white/15 backdrop-blur-sm shadow-md',
    cardBorder: 'border border-white/20',
  },
  red: {
    textClass: 'text-[#ffc2c2]',
    chipTextColor: 'text-[#ffc2c2]',
    cardBg: 'bg-white/15 backdrop-blur-sm shadow-md',
    cardBorder: 'border border-white/20',
  },
  blue: {
    textClass: 'text-[#c2f6ff]',
    chipTextColor: 'text-[#c2f6ff]',
    cardBg: 'bg-white/15 backdrop-blur-sm shadow-md',
    cardBorder: 'border border-white/20',
  },
  purple: {
    textClass: 'text-[#c2cdff]',
    chipTextColor: 'text-[#c2cdff]',
    cardBg: 'bg-white/15 backdrop-blur-sm shadow-md',
    cardBorder: 'border border-white/20',
  },
};
