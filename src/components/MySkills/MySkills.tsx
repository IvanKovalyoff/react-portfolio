import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/useGameStore';
import { skills } from '../../data/skillsData';
import { mySkillsThemeStyles } from './mySkillsThemeStyles';

export const MySkills: React.FC = () => {
  const { t } = useTranslation();
  const currentTheme = useGameStore((state) => state.currentTheme);
  const activeTheme = useGameStore((state) => state.activeTheme);
  const gameState = useGameStore((state) => state.state);

  const previewTheme = gameState === 'showingTheme' && activeTheme ? activeTheme : currentTheme;
  const theme = mySkillsThemeStyles[previewTheme] ?? mySkillsThemeStyles.basic;

  return (
    <section
      id="skills"
      className={`flex w-full justify-center px-4 py-16 transition-colors duration-500 md:px-10 ${theme.gradient}`}
    >
      <div className="flex w-full max-w-5xl flex-col items-center gap-12">
        <h2 className={`text-3xl font-bold drop-shadow-lg md:text-4xl ${theme.textClass}`}>
          {t('skills.title')}
        </h2>

        <div className="flex w-full flex-col gap-10">
          {skills.getAllCategories().map((category) => (
            <div key={category.getTitle()} className="flex flex-col items-center gap-5">
              <h3 className={`text-xl font-semibold drop-shadow-lg md:text-2xl ${theme.textClass}`}>
                {t(category.getTitle())}:
              </h3>

              <div className="flex flex-wrap justify-center gap-4">
                {category.getSkills().map((skill) => (
                  <div
                    key={skill.title}
                    className="flex w-24 flex-col items-center gap-2 rounded-xl p-3 text-center shadow-md sm:w-28 [background:var(--gradient-skill)]"
                  >
                    <img src={skill.image} alt={skill.title} className="h-8 w-8 sm:h-10 sm:w-10" />
                    <span
                      className={`text-xs leading-tight font-medium sm:text-sm ${theme.skillTextColor}`}
                    >
                      {skill.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
