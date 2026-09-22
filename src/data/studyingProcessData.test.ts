import en from '../locales/en.json';
import { ComplexCourse } from '../models/studyingProcess/ComplexCourse';
import type { Project } from '../models/studyingProcess/types';
import { featuredProjects, studyingProcess } from './studyingProcessData';

type Tree = { [key: string]: string | Tree };

const translation = (key: string): string | undefined => {
  const value = key.split('.').reduce<string | Tree | undefined>((node, part) => {
    return typeof node === 'object' ? node[part] : undefined;
  }, en as Tree);

  return typeof value === 'string' ? value : undefined;
};

const allProjects: Project[] = studyingProcess
  .getAllEntries()
  .flatMap((entry) =>
    entry instanceof ComplexCourse
      ? entry.getCourses().flatMap((course) => course.getProjects())
      : entry.getProjects()
  );

describe('projects content', () => {
  it('lists every project of the studying process', () => {
    expect(allProjects.length).toBeGreaterThanOrEqual(8);
  });

  it.each(allProjects.map((project) => [project.name, project] as const))(
    '%s has English text and either a full URL or "-" for links',
    (_name, project) => {
      expect(translation(project.name)).toBeTruthy();
      expect(translation(project.description)).toBeTruthy();
      expect(project.stack.length).toBeGreaterThan(0);

      for (const url of [project.liveUrl, project.repoUrl]) {
        expect(url === '-' || /^https:\/\/[^\s]+$/.test(url)).toBe(true);
      }
    }
  );
});

describe('featured projects', () => {
  it('are shipped projects with a live demo, code and a one-line summary', () => {
    expect(featuredProjects).toHaveLength(3);

    for (const project of featuredProjects) {
      expect(allProjects).toContain(project);
      expect(project.liveUrl).not.toBe('-');
      expect(project.repoUrl).not.toBe('-');
      expect(translation(project.summary ?? '')).toBeTruthy();
    }
  });
});
