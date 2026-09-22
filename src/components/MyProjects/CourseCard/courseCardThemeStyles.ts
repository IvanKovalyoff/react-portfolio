// Middle card in the MyProjects stack (ComplexCourseCard > CourseCard > ProjectCard).
export interface CourseCardThemeStyle {
  textClass: string;
  cardBg: string;
  cardBorder: string;
  progressTrack: string;
}

export const courseCardThemeStyles: Record<string, CourseCardThemeStyle> = {
  basic: {
    textClass: 'text-zinc-800',
    cardBg: 'bg-white shadow-md',
    cardBorder: 'border border-zinc-200',
    progressTrack: 'bg-zinc-200',
  },
  orange: {
    textClass: 'text-[#ffbd59]',
    cardBg: 'bg-white/10 backdrop-blur-sm shadow-lg',
    cardBorder: 'border border-white/15',
    progressTrack: 'bg-white/15',
  },
  green: {
    textClass: 'text-[#d3ff99]',
    cardBg: 'bg-white/10 backdrop-blur-sm shadow-lg',
    cardBorder: 'border border-white/15',
    progressTrack: 'bg-white/15',
  },
  red: {
    textClass: 'text-[#ffc2c2]',
    cardBg: 'bg-white/10 backdrop-blur-sm shadow-lg',
    cardBorder: 'border border-white/15',
    progressTrack: 'bg-white/15',
  },
  blue: {
    textClass: 'text-[#c2f6ff]',
    cardBg: 'bg-white/10 backdrop-blur-sm shadow-lg',
    cardBorder: 'border border-white/15',
    progressTrack: 'bg-white/15',
  },
  purple: {
    textClass: 'text-[#c2cdff]',
    cardBg: 'bg-white/10 backdrop-blur-sm shadow-lg',
    cardBorder: 'border border-white/15',
    progressTrack: 'bg-white/15',
  },
};
