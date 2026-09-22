// Same palette as heroThemeStyles/aboutMeThemeStyles, given its own vertical
// direction so the Hero -> AboutMe -> MySkills run reads as a continuous
// flow of color rather than three copies of the same gradient.
export interface MySkillsThemeStyle {
  gradient: string;
  textClass: string;
  skillTextColor: string;
}

export const mySkillsThemeStyles: Record<string, MySkillsThemeStyle> = {
  basic: {
    gradient: 'bg-gradient-to-l from-zinc-100 via-white to-zinc-50',
    textClass: 'text-zinc-800',
    skillTextColor: 'text-white',
  },
  orange: {
    gradient: 'bg-gradient-to-l from-black to-orange-600',
    textClass: 'text-[#ffbd59]',
    skillTextColor: 'text-[#ffe8d8]',
  },
  green: {
    gradient: 'bg-gradient-to-r from-[#00b303] to-[#18370b]',
    textClass: 'text-[#d3ff99]',
    skillTextColor: 'text-[#d3ff99]',
  },
  red: {
    gradient: 'bg-gradient-to-l from-black to-[#ff0000]',
    textClass: 'text-[#ffc2c2]',
    skillTextColor: 'text-[#ffc2c2]',
  },
  blue: {
    gradient: 'bg-gradient-to-r from-blue-500 via-blue-800 to-indigo-950',
    textClass: 'text-[#c2f6ff]',
    skillTextColor: 'text-[#c2f6ff]',
  },
  purple: {
    gradient: 'bg-gradient-to-r from-purple-600 via-fuchsia-800 to-purple-950',
    textClass: 'text-[#c2cdff]',
    skillTextColor: 'text-[#c2cdff]',
  },
};
