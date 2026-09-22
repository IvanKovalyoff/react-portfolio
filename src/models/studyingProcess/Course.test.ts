import { Course } from './Course';
import type { Project } from './types';

describe('Course', () => {
  const project: Project = {
    name: 'Gadget store',
    description: 'SPA product catalog',
    stack: ['React', 'Vite'],
    imageUrl: '/images/gadget-store.png',
    liveUrl: 'https://ivankovalyoff.github.io/Gadget-store/',
    repoUrl: 'https://github.com/IvanKovalyoff/Gadget-store',
  };

  it('stores introduction and conctusion via StudyUnit', () => {
    const course = new Course('Frontend Basics', 'Intro', 'Conclusion', 40);

    expect(course.getIntroduction()).toBe('Intro');
    expect(course.getConclusion()).toBe('Conclusion');
  });

  it('stores and returns the title', () => {
    const course = new Course('Frontend Basics', 'Intro', 'Conclusion', 40);
    expect(course.getTitle()).toBe('Frontend Basics');
  });

  it('starts with no project and can add one', () => {
    const course = new Course('Frontend Basics', 'Intro', 'Conclusion', 0);

    course.addProject(project);

    expect(course.getProjects()).toHaveLength(1);
  });

  it('can remove project by name', () => {
    const course = new Course('Frontend Basics', 'Intro', 'Conclusion', 0);

    course.addProject(project);
    course.removeProject('Gadget store');

    expect(course.getProjects()).toHaveLength(0);
  });

  it('tracks progress independently of projects', () => {
    const course = new Course('Frontend Basics', 'Intro', 'Conclusion', 75);

    expect(course.getProgress()).toBe(75);
    expect(course.isComplete()).toBe(false);
  });

  it('is complete when progress is 100', () => {
    const course = new Course('Frontend Basics', 'Intro', 'Conclusion', 100);

    expect(course.isComplete()).toBe(true);
  });

  it('reports content count via StudyUnit contract', () => {
    const course = new Course('Frontend Basics', 'Intro', 'Conclusion', 0);

    course.addProject(project);

    expect(course.getContentCount()).toBe(1);
  });
});
