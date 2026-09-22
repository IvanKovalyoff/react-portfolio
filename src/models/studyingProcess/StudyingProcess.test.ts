import { StudyingProcess } from './StudyingProcess';
import { Course } from './Course';
import { ComplexCourse } from './ComplexCourse';

describe('StudyingProcess', () => {
  let process: StudyingProcess;

  beforeEach(() => {
    process = new StudyingProcess('Planning to explore backend and cloud next.');
  });

  it('stores and returns future plans', () => {
    expect(process.getFuturePlans()).toBe('Planning to explore backend and cloud next.');
  });

  it('starts with no entries and can add a Course', () => {
    const course = new Course('React Basics', 'Intro', 'Conclusion', 100);

    process.addEntry(course);

    expect(process.getAllEntries()).toHaveLength(1);
  });

  it('can add a mix of Course and ComplexCourse entries preserving order', () => {
    const course = new Course('React Basics', 'Intro', 'Conclusion', 100);
    const complex = new ComplexCourse('Advanced Web Dev', 'Intro', 'Conclusion');

    process.addEntry(course);
    process.addEntry(complex);

    const entries = process.getAllEntries();

    expect(entries).toHaveLength(2);
    expect(entries[0]).toBe(course);
    expect(entries[1]).toBe(complex);
  });

  it('can remove an entry by title', () => {
    const course = new Course('React Basics', 'Intro', 'Conclusion', 100);

    process.addEntry(course);
    process.removeEntry('React Basics');

    expect(process.getAllEntries()).toHaveLength(0);
  });

  it('reports the total entry count', () => {
    process.addEntry(new Course('React Basics', 'Intro', 'Conclusion', 100));
    process.addEntry(new ComplexCourse('Advanced Web Dev', 'Intro', 'Conclusion'));

    expect(process.getEntryCount()).toBe(2);
  });
});
