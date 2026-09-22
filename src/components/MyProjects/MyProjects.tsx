import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/useGameStore';
import { featuredProjects, studyingProcess } from '../../data/studyingProcessData';
import { ComplexCourse } from '../../models/studyingProcess/ComplexCourse';
import { ComplexCourseCard } from './ComplexCourseCard';
import { CourseCard } from './CourseCard';
import { ProjectCard } from './ProjectCard';
import { myProjectsThemeStyles } from './myProjectsThemeStyles';

export const MyProjects: React.FC = () => {
  const { t } = useTranslation();
  const currentTheme = useGameStore((state) => state.currentTheme);
  const activeTheme = useGameStore((state) => state.activeTheme);
  const gameState = useGameStore((state) => state.state);

  const previewTheme = gameState === 'showingTheme' && activeTheme ? activeTheme : currentTheme;
  const theme = myProjectsThemeStyles[previewTheme] ?? myProjectsThemeStyles.basic;

  return (
    <section
      id="projects"
      className={`flex w-full justify-center px-4 py-16 transition-colors duration-500 md:px-10 ${theme.gradient}`}
    >
      <div className="flex w-full max-w-5xl flex-col items-center gap-12">
        <h2 className={`text-3xl font-bold drop-shadow-lg md:text-4xl ${theme.textClass}`}>
          {t('header.nav.projects')}
        </h2>

        <div className="flex w-full flex-col gap-4">
          <h3
            className={`place-self-center text-2xl font-semibold drop-shadow-lg ${theme.textClass}`}
          >
            {t('myProjects.featuredTitle')}
          </h3>
          <p className={`text-sm leading-relaxed opacity-90 md:text-base ${theme.textClass}`}>
            {t('myProjects.featuredIntro')}
          </p>
          <div className="mt-2 grid w-full gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.name} project={project} variant="compact" />
            ))}
          </div>
        </div>

        <h3 className={`text-2xl font-semibold drop-shadow-lg ${theme.textClass}`}>
          {t('myProjects.timelineTitle')}
        </h3>

        <div className="flex w-full flex-col gap-10">
          {studyingProcess
            .getAllEntries()
            .map((entry) =>
              entry instanceof ComplexCourse ? (
                <ComplexCourseCard key={entry.getTitle()} complexCourse={entry} />
              ) : (
                <CourseCard key={entry.getTitle()} course={entry} />
              )
            )}
        </div>

        <div className="flex max-w-3xl flex-col items-center gap-2 text-center">
          <h3 className={`text-xl font-semibold drop-shadow-lg ${theme.textClass}`}>
            {t('myProjects.futurePlansTitle')}
          </h3>
          <p
            className={`text-sm text-justify leading-relaxed opacity-90 md:text-base ${theme.textClass}`}
          >
            {t(studyingProcess.getFuturePlans())}
          </p>
        </div>
      </div>
    </section>
  );
};
