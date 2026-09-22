import { ComplexCourse } from './ComplexCourse';
import { Course } from './Course';

describe('ComplexCourse', () => {
  let complex: ComplexCourse;

  beforeEach(() => {
    complex = new ComplexCourse('Asvanced Web Dev', 'Intro', 'Conclusion');
  });

  const makeCourse = (title: string, progress: number) =>
    new Course(title, 'Intro', 'Conclusion', progress);

  it('stores introduction and conclusion via StudyUnit', () => {
    expect(complex.getIntroduction()).toBe('Intro');
    expect(complex.getConclusion()).toBe('Conclusion');
  });

  it('stores and returns the title', () => {
    expect(complex.getTitle()).toBe('Asvanced Web Dev');
  });

  it('starts with no courses and can add one', () => {
    complex.addCourse(makeCourse('React Basics', 50));

    expect(complex.getCourses()).toHaveLength(1);
  });

  it('can remove course by title', () => {
    complex.addCourse(makeCourse('React Basics', 50));
    complex.removeCourse('React Basics');

    expect(complex.getCourses()).toHaveLength(0);
  });

  it('reports content count via StudyUnit contract', () => {
    complex.addCourse(makeCourse('React Basics', 0));
    complex.addCourse(makeCourse('Advanced React', 100));

    expect(complex.getContentCount()).toBe(2);
  });
});
