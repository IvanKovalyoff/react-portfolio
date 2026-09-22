// Outermost card in the MyProjects stack (ComplexCourseCard > CourseCard > ProjectCard).
// Kept darker/more transparent than CourseCard so nested cards read as "closer".
export interface ComplexCourseCardThemeStyle {
  textClass: string;
  cardBg: string;
  cardBorder: string;
}

export const complexCourseCardThemeStyles: Record<string, ComplexCourseCardThemeStyle> = {
  basic: {
    textClass: 'text-zinc-800',
    cardBg: 'bg-zinc-100/70',
    cardBorder: 'border border-zinc-200',
  },
  orange: {
    textClass: 'text-[#ffbd59]',
    cardBg: 'bg-black/20 backdrop-blur-sm shadow-lg',
    cardBorder: 'border border-white/10',
  },
  green: {
    textClass: 'text-[#d3ff99]',
    cardBg: 'bg-black/20 backdrop-blur-sm shadow-lg',
    cardBorder: 'border border-white/10',
  },
  red: {
    textClass: 'text-[#ffc2c2]',
    cardBg: 'bg-black/20 backdrop-blur-sm shadow-lg',
    cardBorder: 'border border-white/10',
  },
  blue: {
    textClass: 'text-[#c2f6ff]',
    cardBg: 'bg-black/20 backdrop-blur-sm shadow-lg',
    cardBorder: 'border border-white/10',
  },
  purple: {
    textClass: 'text-[#c2cdff]',
    cardBg: 'bg-black/20 backdrop-blur-sm shadow-lg',
    cardBorder: 'border border-white/10',
  },
};
