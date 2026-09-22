export interface Theme {
  id: string;
  name: string;
}

export type GameState = 'idle' | 'countdown' | 'showingTheme' | 'cooldown';
