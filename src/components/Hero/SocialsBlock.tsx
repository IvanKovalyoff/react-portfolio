import type React from 'react';
import { useTranslation } from 'react-i18next';
import { CONTACT_LINKS } from '../../data/contactLinks';
import type { SocialsDirection, SocialsRowDirection } from './heroCompositions';

interface SocialsBlockProps {
  direction: SocialsDirection;
  compactDirection: SocialsRowDirection;
  icons: [string, string, string, string];
}

// Size and placement are handled in hero.css. `data-direction` is the wanted
// arrangement; `data-compact` is the row used where a column would not fit.
export const SocialsBlock: React.FC<SocialsBlockProps> = ({
  direction,
  compactDirection,
  icons,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="hero__socials"
      data-direction={direction}
      data-compact={compactDirection}
      data-testid="hero-socials"
    >
      <span aria-hidden="true" className="hero__socials-line" />
      <div className="hero__socials-list">
        {CONTACT_LINKS.map((link, index) => (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(`hero.socials.${link.key}`)}
            className="hero__social-link"
          >
            <img src={icons[index]} alt="" />
          </a>
        ))}
      </div>
    </div>
  );
};
