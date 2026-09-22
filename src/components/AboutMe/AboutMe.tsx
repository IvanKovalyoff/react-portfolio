import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/useGameStore';
import { GameWidget } from '../GameWidget';
import { aboutMeThemeStyles } from './aboutMeThemeStyles';

export const AboutMe: React.FC = () => {
  const { t } = useTranslation();
  const currentTheme = useGameStore((state) => state.currentTheme);
  const activeTheme = useGameStore((state) => state.activeTheme);
  const gameState = useGameStore((state) => state.state);

  const previewTheme = gameState === 'showingTheme' && activeTheme ? activeTheme : currentTheme;
  const theme = aboutMeThemeStyles[previewTheme] ?? aboutMeThemeStyles.basic;

  return (
    <section
      id="about"
      className={`flex w-full justify-center px-4 py-16 transition-colors duration-500 md:px-10 ${theme.gradient}`}
    >
      <div className="flex flex-col gap-15">
        <div className="flex w-full max-w-4xl flex-col items-center gap-6 text-center">
          <h2 className={`text-3xl font-bold drop-shadow-lg md:text-4xl ${theme.textClass}`}>
            {t('aboutMe.title')}
          </h2>
          <p
            className={`text-lg font-semibold italic drop-shadow-lg md:text-xl ${theme.textClass}`}
          >
            {t('aboutMe.tagline')}
          </p>
          <p
            className={`whitespace-pre-line text-left text-sm leading-relaxed drop-shadow-lg md:text-base ${theme.textClass}`}
          >
            {t('aboutMe.description')}
          </p>
        </div>

        <GameWidget />
      </div>
    </section>
  );
};
