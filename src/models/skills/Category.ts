import type { Skill } from './skill';

export class Category {
  private title: string;
  private skills: Skill[];

  constructor(title: string) {
    this.title = title;
    this.skills = [];
  }

  getTitle(): string {
    return this.title;
  }

  addSkill(skill: Skill): void {
    const alreadyExists = this.skills.some((existing) => existing.title === skill.title);

    if (alreadyExists) {
      return;
    }

    this.skills.push(skill);
  }

  removeSkill(title: string): void {
    this.skills = this.skills.filter((skill) => skill.title !== title);
  }

  getSkills(): Skill[] {
    return this.skills;
  }

  getSkillCount(): number {
    return this.skills.length;
  }
}
