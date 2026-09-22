import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../../store/useGameStore';
import type { ComplexCourse } from '../../../models/studyingProcess/ComplexCourse';
import { CourseCard } from '../CourseCard';
import { complexCourseCardThemeStyles } from './complexCourseCardThemeStyles';

interface ComplexCourseCardProps {
  complexCourse: ComplexCourse;
}

export const ComplexCourseCard: React.FC<ComplexCourseCardProps> = ({ complexCourse }) => {
  const { t } = useTranslation();
  const currentTheme = useGameStore((state) => state.currentTheme);
  const activeTheme = useGameStore((state) => state.activeTheme);
  const gameState = useGameStore((state) => state.state);

  const previewTheme = gameState === 'showingTheme' && activeTheme ? activeTheme : currentTheme;
  const theme = complexCourseCardThemeStyles[previewTheme] ?? complexCourseCardThemeStyles.basic;

  return (
    <div
      className={`flex flex-col gap-6 rounded-3xl p-6 md:p-8 ${theme.cardBg} ${theme.cardBorder}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className={`text-2xl font-bold drop-shadow-lg md:text-3xl ${theme.textClass}`}>
          {t(complexCourse.getTitle())}
        </h3>
        <p className={`text-sm italic opacity-90 ${theme.textClass}`}>
          {t(complexCourse.getIntroduction())}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {complexCourse.getCourses().map((course) => (
          <CourseCard key={course.getTitle()} course={course} nested />
        ))}
      </div>

      <p className={`text-sm leading-relaxed opacity-90 ${theme.textClass}`}>
        {t(complexCourse.getConclusion())}
      </p>
    </div>
  );
};
