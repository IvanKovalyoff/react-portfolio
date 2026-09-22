import { Course } from './Course';
import { ComplexCourse } from './ComplexCourse';

type StudyEntry = Course | ComplexCourse;

export class StudyingProcess {
  private futurePlans: string;
  private entries: StudyEntry[];

  constructor(futurePlans: string) {
    this.futurePlans = futurePlans;
    this.entries = [];
  }

  getFuturePlans(): string {
    return this.futurePlans;
  }

  addEntry(entry: StudyEntry): void {
    this.entries.push(entry);
  }

  removeEntry(title: string): void {
    this.entries = this.entries.filter((entry) => entry.getTitle() !== title);
  }

  getAllEntries(): StudyEntry[] {
    return this.entries;
  }

  getEntryCount(): number {
    return this.entries.length;
  }
}
