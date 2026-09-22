import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/useGameStore';
import { heroThemeStyles } from './heroThemeStyles';
import { heroPhotos } from './heroPhotos';
import {
  heroCompositions,
  getSocialsPlacement,
  getCompactSocialsDirection,
} from './heroCompositions';
import { SocialsBlock } from './SocialsBlock';
import './hero.css';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const currentTheme = useGameStore((state) => state.currentTheme);
  const activeTheme = useGameStore((state) => state.activeTheme);
  const gameState = useGameStore((state) => state.state);

  const previewTheme = gameState === 'showingTheme' && activeTheme ? activeTheme : currentTheme;
  const theme = heroThemeStyles[previewTheme] ?? heroThemeStyles.basic;
  const photo = heroPhotos[previewTheme] ?? heroPhotos.basic;
  const composition = heroCompositions[previewTheme] ?? heroCompositions.basic;
  const isColorBackground = theme.bgImage.startsWith('#');
  const [socialsV, socialsH] = composition.socials.corner.split('-');

  return (
    <section className={`hero transition-colors duration-500 ${theme.gradient}`} data-testid="hero">
      <div
        className="hero__stage"
        data-testid="hero-stage"
        style={
          isColorBackground
            ? { backgroundColor: theme.bgImage }
            : { backgroundImage: `url(${theme.bgImage})` }
        }
      >
        <div
          className="hero__layout"
          data-theme-id={previewTheme}
          data-side={composition.photoSide}
          data-fit={composition.photoFit}
          data-portrait={composition.portrait}
          data-portrait-photo={composition.portraitPhotoAlign}
          data-portrait-text={composition.portraitTextAlign}
          data-soc-v={socialsV}
          data-soc-h={socialsH}
          data-soc-in={getSocialsPlacement(composition)}
          style={
            {
              '--ar': photo.aspect,
              '--pmw': composition.photoMaxWidth,
              '--k': composition.titleScale,
            } as React.CSSProperties
          }
        >
          <figure className="hero__photo">
            <img
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={t('hero.photoAlt')}
              fetchPriority="high"
              decoding="async"
              data-testid="hero-photo"
            />
          </figure>

          <div className="hero__text">
            <div className="hero__intro">
              <p className={`hero__greeting ${theme.textClass}`} data-testid="hero-greeting">
                {t('hero.greeting')}
              </p>
              <h1 className={`hero__title ${theme.textClass}`} data-testid="hero-title">
                {t('hero.headline')}
              </h1>
            </div>

            <p className={`hero__sub ${theme.textClass}`} data-testid="hero-sub">
              {t('hero.subheadline')}
            </p>
          </div>

          <SocialsBlock
            direction={composition.socials.direction}
            compactDirection={getCompactSocialsDirection(composition)}
            icons={theme.icons}
          />
        </div>
      </div>
    </section>
  );
};
