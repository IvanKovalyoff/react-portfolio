import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/useGameStore';
import { heroThemeStyles } from '../Hero/heroThemeStyles';
import { CONTACT_LINKS } from '../../data/contactLinks';
import { myContactsThemeStyles } from './myContactsThemeStyles';

// City level on purpose: no street address on a public page.
const MAP_ADDRESS = 'Poznań, Poland';
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_ADDRESS)}&output=embed`;

export const MyContacts: React.FC = () => {
  const { t } = useTranslation();
  const currentTheme = useGameStore((state) => state.currentTheme);
  const activeTheme = useGameStore((state) => state.activeTheme);
  const gameState = useGameStore((state) => state.state);

  const previewTheme = gameState === 'showingTheme' && activeTheme ? activeTheme : currentTheme;
  const theme = myContactsThemeStyles[previewTheme] ?? myContactsThemeStyles.basic;
  const icons = (heroThemeStyles[previewTheme] ?? heroThemeStyles.basic).icons;

  return (
    <section
      id="contacts"
      className={`flex w-full justify-center px-4 py-16 transition-colors duration-500 md:px-10 ${theme.gradient}`}
    >
      <div className="flex w-full max-w-5xl flex-col items-center gap-10">
        <h2 className={`text-3xl font-bold drop-shadow-lg md:text-4xl ${theme.textClass}`}>
          {t('header.nav.contacts')}
        </h2>

        <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-20">
          <div className={`w-full rounded-xl p-1.5 shadow-lg ${theme.borderGradient} lg:p-3`}>
            <iframe
              src={MAP_SRC}
              title={t('contacts.mapTitle')}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full rounded-lg border-0 md:h-96"
            />
          </div>

          <div className="flex flex-col items-start justify-center gap-6">
            {CONTACT_LINKS.slice(1).map((link, index) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex origin-left items-center gap-2 transition-transform hover:scale-105"
              >
                <img src={icons[index + 1]} alt="" className="h-8 w-8 md:h-9 md:w-9" />
                <p
                  className={`text-center text-lg break-all drop-shadow-lg md:text-xl ${theme.textClass}`}
                >
                  {link.label}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
