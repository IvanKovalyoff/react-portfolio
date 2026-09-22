import { Category } from './Category';

export class Skills {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  addCategory(category: Category): void {
    const alreadyExists = this.categories.some(
      (existing) => existing.getTitle() === category.getTitle()
    );

    if (alreadyExists) {
      return;
    }

    this.categories.push(category);
  }

  removeCategory(title: string): void {
    this.categories = this.categories.filter((category) => category.getTitle() !== title);
  }

  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoryCount(): number {
    return this.categories.length;
  }
}
