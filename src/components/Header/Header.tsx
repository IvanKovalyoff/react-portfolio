import type React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/useGameStore';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { headerThemeStyles } from './headerThemeStyles';

const NAV_ITEMS = [
  { href: '#about', labelKey: 'header.nav.about' },
  { href: '#skills', labelKey: 'header.nav.skills' },
  { href: '#projects', labelKey: 'header.nav.projects' },
  { href: '#contacts', labelKey: 'header.nav.contacts' },
] as const;

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const currentTheme = useGameStore((state) => state.currentTheme);
  const activeTheme = useGameStore((state) => state.activeTheme);
  const gameState = useGameStore((state) => state.state);

  const previewTheme = gameState === 'showingTheme' && activeTheme ? activeTheme : currentTheme;
  const theme = headerThemeStyles[previewTheme] ?? headerThemeStyles.basic;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-linear-to-r ${theme.gradient} shadow-md transition-colors duration-500`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        {t('header.skipToContent')}
      </a>
      <div className="mx-auto flex items-center justify-between gap-4 px-4 md:px-10">
        <a
          href="#top"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex shrink-0 items-center"
        >
          <img
            src={theme.logo}
            alt={t('header.logoAlt')}
            width={480}
            height={240}
            className="h-15 w-auto md:h-20"
          />
        </a>

        <nav className="hidden md:flex md:items-center md:gap-8">
          <ul className="flex items-center gap-6 font-bold">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`transition-colors ${theme.text} ${theme.hoverText}`}
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher theme={theme} />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher theme={theme} />

          {/* Mobile menu */}
          <nav>
            <details
              className="group cursor-pointer"
              open={isMobileMenuOpen}
              onToggle={(event) => setIsMobileMenuOpen(event.currentTarget.open)}
            >
              <summary className="list-none p-2" aria-label={t('header.toggleMenu')}>
                <div
                  className={`relative top-0 h-1 w-8 rounded-full ${theme.bar} transition-all group-open:top-2 group-open:rotate-45`}
                ></div>
                <div
                  className={`mt-1 h-1 w-8 rounded-full ${theme.bar} opacity-100 transition-all group-open:opacity-0`}
                ></div>
                <div
                  className={`relative top-0 mt-1 h-1 w-8 rounded-full ${theme.bar} transition-all group-open:-top-2 group-open:-rotate-45`}
                ></div>
              </summary>

              <ul
                className={`absolute top-full left-0 z-50 h-[calc(100vh-3rem)] w-full list-none bg-linear-to-r ${theme.gradient} shadow-lg pt-15`}
              >
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`relative flex h-full cursor-pointer items-center justify-center p-4 font-bold transition-colors hover:bg-white/10 ${theme.text} ${theme.hoverText}`}
                    >
                      {t(item.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </nav>
        </div>
      </div>
    </header>
  );
};
