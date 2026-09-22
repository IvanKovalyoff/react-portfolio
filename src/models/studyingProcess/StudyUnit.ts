export abstract class StudyUnit {
  private introduction: string;
  private conclusion: string;

  constructor(introduction: string, conclusion: string) {
    this.introduction = introduction;
    this.conclusion = conclusion;
  }

  getIntroduction(): string {
    return this.introduction;
  }

  getConclusion(): string {
    return this.conclusion;
  }

  abstract getContentCount(): number;
}
