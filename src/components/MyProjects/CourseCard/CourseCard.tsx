import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../../store/useGameStore';
import type { Course } from '../../../models/studyingProcess/Course';
import { ProjectCard } from '../ProjectCard';
import { courseCardThemeStyles } from './courseCardThemeStyles';

interface CourseCardProps {
  course: Course;
  nested?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, nested = false }) => {
  const { t } = useTranslation();
  const currentTheme = useGameStore((state) => state.currentTheme);
  const activeTheme = useGameStore((state) => state.activeTheme);
  const gameState = useGameStore((state) => state.state);

  const previewTheme = gameState === 'showingTheme' && activeTheme ? activeTheme : currentTheme;
  const theme = courseCardThemeStyles[previewTheme] ?? courseCardThemeStyles.basic;

  const projects = course.getProjects();
  const progress = course.getProgress();
  const conclusionKey = course.getConclusion();
  const conclusion = conclusionKey ? t(conclusionKey) : '';

  return (
    <div className={`flex flex-col gap-5 rounded-2xl p-6 ${theme.cardBg} ${theme.cardBorder}`}>
      <div className="flex flex-col gap-2">
        <h3
          className={`font-bold drop-shadow-lg ${theme.textClass} ${nested ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}
        >
          {t(course.getTitle())}
        </h3>
        <p className={`text-sm italic opacity-90 ${theme.textClass}`}>
          {t(course.getIntroduction())}
        </p>

        <div className="flex items-center gap-3">
          <div
            className={`h-2 w-full max-w-xs overflow-hidden rounded-full ${theme.progressTrack}`}
          >
            <div
              className="h-full rounded-full [background:var(--gradient-accent)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={`text-xs font-medium whitespace-nowrap ${theme.textClass}`}>
            {t('myProjects.progressLabel', { progress })}
          </span>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="flex flex-col gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      ) : (
        <p className={`text-sm opacity-80 ${theme.textClass}`}>{t('myProjects.inProgress')}</p>
      )}

      {conclusion && (
        <p className={`text-sm leading-relaxed opacity-90 ${theme.textClass}`}>{conclusion}</p>
      )}
    </div>
  );
};
