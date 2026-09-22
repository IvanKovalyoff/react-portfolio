import { StudyUnit } from './StudyUnit';
import type { Project } from './types';

export class Course extends StudyUnit {
  private title: string;
  private projects: Project[];
  private progress: number;

  constructor(title: string, introduction: string, conclusion: string, progress: number) {
    super(introduction, conclusion);
    this.title = title;
    this.projects = [];
    this.progress = progress;
  }

  getTitle(): string {
    return this.title;
  }

  addProject(project: Project): void {
    this.projects.push(project);
  }

  removeProject(name: string): void {
    this.projects = this.projects.filter((project) => project.name !== name);
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getProgress(): number {
    return this.progress;
  }

  isComplete(): boolean {
    return this.progress === 100;
  }

  getContentCount(): number {
    return this.projects.length;
  }
}
