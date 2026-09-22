import { Skills } from './Skills';
import { Category } from './Category';

describe('Skills', () => {
  let skills: Skills;

  beforeEach(() => {
    skills = new Skills();
  });

  it('starts with no categories and can add one', () => {
    skills.addCategory(new Category('Frontend'));

    expect(skills.getAllCategories()).toHaveLength(1);
  });

  it('does not add a category with a title that already exists', () => {
    skills.addCategory(new Category('Frontend'));
    skills.addCategory(new Category('Frontend'));

    expect(skills.getCategoryCount()).toBe(1);
  });

  it('can remove a category by title', () => {
    skills.addCategory(new Category('Frontend'));
    skills.removeCategory('Frontend');

    expect(skills.getAllCategories()).toHaveLength(0);
  });

  it('removing a category that does not exist is a no-op', () => {
    skills.addCategory(new Category('Frontend'));
    skills.removeCategory('Backend');

    expect(skills.getCategoryCount()).toBe(1);
  });

  it('reports the total category count', () => {
    skills.addCategory(new Category('Frontend'));
    skills.addCategory(new Category('Backend'));

    expect(skills.getCategoryCount()).toBe(2);
  });
});
