import { Game } from './Game';
import type { Theme } from './gameTypes';

describe('Game', () => {
  const basicTheme: Theme = { id: 'basic', name: 'Basic' };
  const themes: Theme[] = [
    { id: 'theme1', name: 'Theme One' },
    { id: 'theme2', name: 'Theme Two' },
    { id: 'theme3', name: 'Theme Three' },
    { id: 'theme4', name: 'Theme Four' },
    { id: 'theme5', name: 'Theme Five' },
  ];

  it('starts idle with the basic theme applied', () => {
    const game = new Game(themes, basicTheme);
    expect(game.getState()).toBe('idle');
    expect(game.getCurrentTheme()).toEqual(basicTheme);
  });

  it('can be played when idle and not in cooldown', () => {
    const game = new Game(themes, basicTheme);
    expect(game.canPlay(0)).toBe(true);
  });

  it('moves to countdown state when started', () => {
    const game = new Game(themes, basicTheme);
    game.start(0);
    expect(game.getState()).toBe('countdown');
  });

  it('moves to showingTheme with a random theme once countdown completes', () => {
    const randomFn = () => 0;
    const game = new Game(themes, basicTheme, randomFn);
    game.start(0);
    game.completeCountdown();
    expect(game.getState()).toBe('showingTheme');
    expect(game.getActiveTheme()).toEqual(themes[0]);
  });

  it('applies the active theme and returns to idle', () => {
    const randomFn = () => 0;
    const game = new Game(themes, basicTheme, randomFn);
    game.start(0);
    game.completeCountdown();
    game.applyTheme();
    expect(game.getState()).toBe('idle');
    expect(game.getCurrentTheme()).toEqual(themes[0]);
  });

  it('resets to the basic theme and returns to idle', () => {
    const randomFn = () => 0;
    const game = new Game(themes, basicTheme, randomFn);
    game.start(0);
    game.completeCountdown();
    game.resetTheme();
    expect(game.getState()).toBe('idle');
    expect(game.getCurrentTheme()).toEqual(basicTheme);
  });

  it('shows the next unseen theme on timeout, no repeats', () => {
    const randomFn = () => 0;
    const game = new Game(themes, basicTheme, randomFn);
    game.start(0);
    game.completeCountdown();
    expect(game.getActiveTheme()).toEqual(themes[0]);
    game.handleThemeTimeout(1000);
    expect(game.getState()).toBe('showingTheme');
    expect(game.getActiveTheme()).toEqual(themes[1]);
  });

  it('enters cooldown after all 5 themes are shown with no action', () => {
    const randomFn = () => 0;
    const game = new Game(themes, basicTheme, randomFn);
    game.start(0);
    game.completeCountdown();
    game.handleThemeTimeout(1000); // theme2
    game.handleThemeTimeout(2000); // theme3
    game.handleThemeTimeout(3000); // theme4
    game.handleThemeTimeout(4000); // theme5
    game.handleThemeTimeout(5000); // all shown, no themes left -> cooldown
    expect(game.getState()).toBe('cooldown');
  });

  it('excludes the currently applied theme from the pool on the next round', () => {
    const randomFn = () => 0;
    const game = new Game(themes, basicTheme, randomFn);
    game.start(0);
    game.completeCountdown();
    game.applyTheme();
    expect(game.getCurrentTheme()).toEqual(themes[0]);

    game.start(1000);
    game.completeCountdown();
    expect(game.getActiveTheme()).toEqual(themes[1]);
  });

  it('resets to the basic theme if a full cycle completes with none applied', () => {
    const randomFn = () => 0;
    const game = new Game(themes, basicTheme, randomFn);
    game.start(0);
    game.completeCountdown();
    game.applyTheme();
    expect(game.getCurrentTheme()).toEqual(themes[0]);

    game.start(1000);
    game.completeCountdown();
    let lastTimeout = 1000;
    for (let i = 0; i < 4; i++) {
      lastTimeout += 1000;
      game.handleThemeTimeout(lastTimeout);
    }

    expect(game.getState()).toBe('cooldown');
    expect(game.getCurrentTheme()).toEqual(basicTheme);
  });

  it('cannot be played during cooldown, but can after 5 minutes pass', () => {
    const randomFn = () => 0;
    const game = new Game(themes, basicTheme, randomFn);
    game.start(0);
    game.completeCountdown();
    let lastTimeout = 0;
    for (let i = 0; i < 5; i++) {
      lastTimeout = 1000 + i * 1000;
      game.handleThemeTimeout(lastTimeout);
    }
    expect(game.getState()).toBe('cooldown');
    expect(game.canPlay(lastTimeout)).toBe(false);
    const fiveMinutesMs = 5 * 60 * 1000;
    expect(game.canPlay(lastTimeout + fiveMinutesMs)).toBe(true);
  });
});
