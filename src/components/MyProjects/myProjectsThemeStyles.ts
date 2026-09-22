// Same palette as heroThemeStyles/aboutMeThemeStyles/mySkillsThemeStyles, mirrored
// to the opposite gradient direction of MySkills so the Hero -> AboutMe -> MySkills
// -> MyProjects run keeps reading as one continuous flow of color.
// Card-level appearance (ComplexCourseCard/CourseCard/ProjectCard) lives in each
// card's own themeStyles file instead of here.
export interface MyProjectsThemeStyle {
  gradient: string;
  textClass: string;
}

export const myProjectsThemeStyles: Record<string, MyProjectsThemeStyle> = {
  basic: {
    gradient: 'bg-gradient-to-l from-zinc-50 via-white to-zinc-100',
    textClass: 'text-zinc-800',
  },
  orange: {
    gradient: 'bg-gradient-to-l from-orange-600 to-black',
    textClass: 'text-[#ffbd59]',
  },
  green: {
    gradient: 'bg-gradient-to-r from-[#18370b] to-[#00b303]',
    textClass: 'text-[#d3ff99]',
  },
  red: {
    gradient: 'bg-gradient-to-l from-[#ff0000] to-black',
    textClass: 'text-[#ffc2c2]',
  },
  blue: {
    gradient: 'bg-gradient-to-r from-indigo-950 via-blue-800 to-blue-500',
    textClass: 'text-[#c2f6ff]',
  },
  purple: {
    gradient: 'bg-gradient-to-r from-purple-950 via-fuchsia-800 to-purple-600',
    textClass: 'text-[#c2cdff]',
  },
};
