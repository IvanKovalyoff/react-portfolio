import type { Theme } from '../models/game/gameTypes';

export const basicTheme: Theme = { id: 'basic', name: 'Basic' };

export const gameThemes: Theme[] = [
  { id: 'orange', name: 'Blaze-Vector' },
  { id: 'green', name: 'Matrix-Green' },
  { id: 'red', name: 'Inferno-Red' },
  { id: 'blue', name: 'Quantum-Blue' },
  { id: 'purple', name: 'Plasma-Purple' },
];

export const allThemes: Theme[] = [basicTheme, ...gameThemes];

export const getThemeName = (id: string): string =>
  allThemes.find((theme) => theme.id === id)?.name ?? id;
