import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import flagGb from 'flag-icons/flags/4x3/gb.svg';
import flagPl from 'flag-icons/flags/4x3/pl.svg';
import flagUa from 'flag-icons/flags/4x3/ua.svg';
import type { HeaderThemeStyle } from '../Header/headerThemeStyles';

const LANGUAGES = [
  { code: 'en', flag: flagGb, label: 'EN', name: 'English' },
  { code: 'pl', flag: flagPl, label: 'PL', name: 'Polski' },
  { code: 'uk', flag: flagUa, label: 'UA', name: 'Українська' },
] as const;

interface LanguageSwitcherProps {
  theme: HeaderThemeStyle;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ theme }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.resolvedLanguage) ?? LANGUAGES[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        className={`flex items-center gap-2 rounded-md border border-black/10 px-3 py-1.5 transition-colors hover:opacity-90 ${theme.switcherBg} ${theme.switcherText}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <img
          src={currentLanguage.flag}
          alt=""
          width={20}
          height={15}
          className="h-[15px] w-5 rounded-sm"
        />
        <span className="lg:hidden">{currentLanguage.label}</span>
        <span className="hidden lg:inline">{currentLanguage.name}</span>
        <span aria-hidden="true" className="text-xs opacity-60">
          ▾
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={`absolute right-0 z-51 mt-1 min-w-full overflow-hidden rounded-md border border-black/10 shadow-lg ${theme.switcherBg}`}
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={lang.code === currentLanguage.code}
                className={`flex w-full items-center gap-2 whitespace-nowrap px-3 py-1.5 text-left transition-colors hover:bg-black/10 ${theme.switcherText}`}
                onClick={() => handleSelect(lang.code)}
              >
                <img
                  src={lang.flag}
                  alt=""
                  width={20}
                  height={15}
                  className="h-[15px] w-5 rounded-sm"
                />
                <span className="lg:hidden">{lang.label}</span>
                <span className="hidden lg:inline">{lang.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
