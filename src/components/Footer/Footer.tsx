import type React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import logoFooter from '../../assets/Logos/logo_footer.webp';

// Public repository of this portfolio.
const GITHUB_REPO_URL = 'https://github.com/IvanKovalyoff/react-portfolio';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-black">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-10 md:items-start">
        <a
          href="https://github.com/IvanKovalyoff"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center origin-center md:items-start md:justify-start transition-transform hover:scale-105 md:origin-left"
        >
          <img
            src={logoFooter}
            alt={t('footer.logoAlt')}
            width={480}
            height={240}
            loading="lazy"
            className="h-16 w-auto md:h-20"
          />
        </a>

        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <p className="flex items-center gap-1.5 text-base text-white">
            <FontAwesomeIcon icon={faCopyright} className="h-3 w-3" />
            {t('footer.copyright')}
          </p>

          <p className="max-w-md text-sm leading-relaxed text-white/70">
            {t('footer.description')}
          </p>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-white/20 [background:var(--gradient-accent)] px-3 py-1.5 text-base font-bold text-white transition-colors hover:opacity-90"
          >
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
