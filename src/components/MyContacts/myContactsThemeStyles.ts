// Same palette and direction as mySkillsThemeStyles, so the gradient flow
// that returns to MySkills' look reads consistently after MyProjects.
// borderGradient reuses the exact same color stops as gradient, mirrored to
// the opposite direction, for the map iframe's gradient border.
export interface MyContactsThemeStyle {
  gradient: string;
  borderGradient: string;
  textClass: string;
}

export const myContactsThemeStyles: Record<string, MyContactsThemeStyle> = {
  basic: {
    gradient: 'bg-gradient-to-l from-zinc-100 via-white to-zinc-50',
    borderGradient: 'bg-gradient-to-r from-zinc-100 via-white to-zinc-50',
    textClass: 'text-zinc-800',
  },
  orange: {
    gradient: 'bg-gradient-to-l from-black to-orange-600',
    borderGradient: 'bg-gradient-to-r from-black to-orange-600',
    textClass: 'text-[#ffbd59]',
  },
  green: {
    gradient: 'bg-gradient-to-r from-[#00b303] to-[#18370b]',
    borderGradient: 'bg-gradient-to-l from-[#00b303] to-[#18370b]',
    textClass: 'text-[#d3ff99]',
  },
  red: {
    gradient: 'bg-gradient-to-l from-black to-[#ff0000]',
    borderGradient: 'bg-gradient-to-r from-black to-[#ff0000]',
    textClass: 'text-[#ffc2c2]',
  },
  blue: {
    gradient: 'bg-gradient-to-r from-blue-500 via-blue-800 to-indigo-950',
    borderGradient: 'bg-gradient-to-l from-blue-500 via-blue-800 to-indigo-950',
    textClass: 'text-[#c2f6ff]',
  },
  purple: {
    gradient: 'bg-gradient-to-r from-purple-600 via-fuchsia-800 to-purple-950',
    borderGradient: 'bg-gradient-to-l from-purple-600 via-fuchsia-800 to-purple-950',
    textClass: 'text-[#c2cdff]',
  },
};
