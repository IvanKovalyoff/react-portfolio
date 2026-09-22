import { StudyUnit } from './StudyUnit';
import { Course } from './Course';

export class ComplexCourse extends StudyUnit {
  private title: string;
  private courses: Course[];

  constructor(title: string, introduction: string, conclusion: string) {
    super(introduction, conclusion);
    this.title = title;
    this.courses = [];
  }

  getTitle(): string {
    return this.title;
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  removeCourse(title: string): void {
    this.courses = this.courses.filter((course) => course.getTitle() !== title);
  }

  getCourses(): Course[] {
    return this.courses;
  }

  getContentCount(): number {
    return this.courses.length;
  }
}
