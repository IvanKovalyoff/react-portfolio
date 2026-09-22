import { Category } from './Category';
import type { Skill } from './skill';

describe('Category', () => {
  const skill: Skill = {
    image: 'images/skillImages/image',
    title: 'JavaScript',
  };

  it('class type', () => {
    const test = new Category('Design');

    expect(test).toBeInstanceOf(Category);
  });

  it('can stores and return the title', () => {
    const test = new Category('Design');

    expect(test.getTitle()).toBe('Design');
  });

  it('starts with no skill and can add one', () => {
    const test = new Category('Frontend Basics');

    test.addSkill(skill);

    expect(test.getSkills()).toHaveLength(1);
  });

  it('does not add a skill with a title that already exists', () => {
    const test = new Category('Frontend Basics');

    test.addSkill(skill);
    test.addSkill(skill);

    expect(test.getSkillCount()).toBe(1);
  });

  it('can remove a skill by title', () => {
    const test = new Category('Frontend Basics');

    test.addSkill(skill);
    test.removeSkill('JavaScript');

    expect(test.getSkills()).toHaveLength(0);
  });

  it('removing a skill that does not exist is a no-op', () => {
    const test = new Category('Frontend Basics');

    test.addSkill(skill);
    test.removeSkill('Python');

    expect(test.getSkillCount()).toBe(1);
  });
});
