import type { Theme, GameState } from './gameTypes';

export const COOLDOWN_DURATION_MS = 5 * 60 * 1000;

export class Game {
  private allThemes: Theme[];
  private basicTheme: Theme;
  private randomFn: () => number;

  private state: GameState;
  private currentTheme: Theme;
  private activeTheme: Theme | null;
  private remainingThemes: Theme[];
  private cooldownStartedAt: number | null;

  constructor(themes: Theme[], basicTheme: Theme, randomFn: () => number = Math.random) {
    this.allThemes = themes;
    this.basicTheme = basicTheme;
    this.randomFn = randomFn;

    this.state = 'idle';
    this.currentTheme = basicTheme;
    this.activeTheme = null;
    this.remainingThemes = [];
    this.cooldownStartedAt = null;
  }

  getState(): GameState {
    return this.state;
  }

  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  getActiveTheme(): Theme | null {
    return this.activeTheme;
  }

  canPlay(now: number): boolean {
    if (this.state === 'cooldown') {
      return (
        this.cooldownStartedAt !== null && now - this.cooldownStartedAt >= COOLDOWN_DURATION_MS
      );
    }
    return this.state === 'idle';
  }

  start(now: number): void {
    if (!this.canPlay(now)) {
      return;
    }
    this.state = 'countdown';
    this.remainingThemes = this.allThemes.filter((theme) => theme.id !== this.currentTheme.id);
  }

  completeCountdown(): void {
    if (this.state !== 'countdown') {
      return;
    }
    this.pickNextTheme(0);
  }

  private pickNextTheme(now: number): void {
    if (this.remainingThemes.length === 0) {
      this.enterCooldown(now);
      return;
    }
    const index = Math.floor(this.randomFn() * this.remainingThemes.length);
    const [chosen] = this.remainingThemes.splice(index, 1);
    this.activeTheme = chosen;
    this.state = 'showingTheme';
  }

  applyTheme(): void {
    if (this.state !== 'showingTheme' || this.activeTheme === null) {
      return;
    }
    this.currentTheme = this.activeTheme;
    this.activeTheme = null;
    this.state = 'idle';
  }

  resetTheme(): void {
    if (this.state !== 'showingTheme') {
      return;
    }
    this.currentTheme = this.basicTheme;
    this.activeTheme = null;
    this.state = 'idle';
  }

  handleThemeTimeout(now: number): void {
    if (this.state !== 'showingTheme') {
      return;
    }
    this.pickNextTheme(now);
  }

  private enterCooldown(now: number): void {
    this.state = 'cooldown';
    this.currentTheme = this.basicTheme;
    this.activeTheme = null;
    this.cooldownStartedAt = now;
  }
}
