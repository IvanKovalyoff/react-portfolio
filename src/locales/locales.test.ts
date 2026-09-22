import en from './en.json';
import pl from './pl.json';
import uk from './uk.json';

type Tree = { [key: string]: string | Tree };

const flatten = (tree: Tree, prefix = ''): Record<string, string> =>
  Object.entries(tree).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    return typeof value === 'string'
      ? { ...acc, [path]: value }
      : { ...acc, ...flatten(value, path) };
  }, {});

const placeholders = (text: string): string[] => (text.match(/{{\s*\w+\s*}}/g) ?? []).sort();

const locales = { en: flatten(en), pl: flatten(pl), uk: flatten(uk) };
const referenceKeys = Object.keys(locales.en).sort();

describe('locales', () => {
  it.each(['pl', 'uk'] as const)('%s has exactly the same keys as en', (code) => {
    expect(Object.keys(locales[code]).sort()).toEqual(referenceKeys);
  });

  it.each(['pl', 'uk'] as const)('%s keeps the same interpolation placeholders as en', (code) => {
    const mismatched = referenceKeys.filter(
      (key) => placeholders(locales[code][key]).join() !== placeholders(locales.en[key]).join()
    );

    expect(mismatched).toEqual([]);
  });

  it('never leaves a key empty in only some of the languages', () => {
    const inconsistent = referenceKeys.filter((key) => {
      const emptyCount = Object.values(locales).filter(
        (locale) => locale[key].trim() === ''
      ).length;

      return emptyCount !== 0 && emptyCount !== 3;
    });

    expect(inconsistent).toEqual([]);
  });

  it('uses one spelling of "проєкт" in the Ukrainian locale', () => {
    expect(JSON.stringify(uk)).not.toMatch(/проект/i);
  });
});
