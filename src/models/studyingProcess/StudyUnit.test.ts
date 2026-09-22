import { StudyUnit } from './StudyUnit';

class TestUnit extends StudyUnit {
  getContentCount(): number {
    return 0;
  }
}

describe('StudyUnit', () => {
  it('stores and returns the introduction', () => {
    const unit = new TestUnit('Intro text', 'Conclusion text');
    expect(unit.getIntroduction()).toBe('Intro text');
  });

  it('stores and returns the conclusion', () => {
    const unit = new TestUnit('Intro text', 'Conclusion text');
    expect(unit.getConclusion()).toBe('Conclusion text');
  });
});
