import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../../store/useGameStore';
import type { Project } from '../../../models/studyingProcess/types';
import { projectCardThemeStyles } from './projectCardThemeStyles';

interface ProjectCardProps {
  project: Project;
  /** "compact" shows the one-line summary instead of the full story. */
  variant?: 'full' | 'compact';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'full' }) => {
  const { t } = useTranslation();
  const currentTheme = useGameStore((state) => state.currentTheme);
  const activeTheme = useGameStore((state) => state.activeTheme);
  const gameState = useGameStore((state) => state.state);

  const previewTheme = gameState === 'showingTheme' && activeTheme ? activeTheme : currentTheme;
  const theme = projectCardThemeStyles[previewTheme] ?? projectCardThemeStyles.basic;
  const text = variant === 'compact' && project.summary ? project.summary : project.description;

  return (
    <div
      className={`flex flex-col-reverse items-center gap-5 rounded-2xl p-5 ${
        variant === 'compact' ? 'h-full' : ''
      } ${theme.cardBg} ${theme.cardBorder}`}
    >
      <div className="flex w-full flex-1 flex-col gap-3">
        <h4 className={`text-lg font-semibold ${theme.textClass}`}>{t(project.name)}</h4>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <div
              key={tech}
              className={`rounded-full px-3 py-1 text-xs font-medium [background:var(--techBg-gradient)] ${theme.chipTextColor} ${theme.cardBg}`}
            >
              <p>{tech}</p>
            </div>
          ))}
        </div>

        <p className={`text-sm leading-relaxed opacity-90 ${theme.textClass}`}>{t(text)}</p>

        <div className="mt-auto flex gap-3 pt-1">
          {project.liveUrl !== '-' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded px-3 py-1.5 text-xs font-medium text-white transition-opacity [background:var(--gradient-accent)] hover:opacity-90"
            >
              {t('myProjects.liveLabel')}
            </a>
          )}
          {project.repoUrl !== '-' && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80 ${theme.textClass} ${theme.cardBorder}`}
            >
              {t('myProjects.githubLabel')}
            </a>
          )}
        </div>
      </div>

      <div className="w-full shrink-0">
        <img
          src={project.imageUrl}
          alt={t('myProjects.screenshotAlt', { name: t(project.name) })}
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
};
