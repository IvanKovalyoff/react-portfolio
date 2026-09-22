import { create } from 'zustand';
import { Game, COOLDOWN_DURATION_MS } from '../models/game/Game';
import { basicTheme, gameThemes } from '../data/gameThemes';
import type { GameState } from '../models/game/gameTypes';

interface GameStoreState {
  game: Game;
  state: GameState;
  currentTheme: string;
  activeTheme: string | null;
  countdownSecondsLeft: number | null;
  themeSecondsLeft: number | null;
  cooldownActive: boolean;
  cooldownSecondsLeft: number | null;

  play: () => void;
  applyTheme: () => void;
  resetTheme: () => void;
}

let countdownTimer: ReturnType<typeof setInterval> | null = null;
let themeTimer: ReturnType<typeof setInterval> | null = null;
let cooldownTimer: ReturnType<typeof setInterval> | null = null;

const clearTimers = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }

  if (themeTimer) {
    clearInterval(themeTimer);
  }

  if (cooldownTimer) {
    clearInterval(cooldownTimer);
  }

  countdownTimer = null;
  themeTimer = null;
  cooldownTimer = null;
};

export const useGameStore = create<GameStoreState>((set, get) => ({
  game: new Game(gameThemes, basicTheme),
  state: 'idle',
  currentTheme: basicTheme.id,
  activeTheme: null,
  countdownSecondsLeft: null,
  themeSecondsLeft: null,
  cooldownActive: false,
  cooldownSecondsLeft: null,

  play: () => {
    const { game } = get();
    const now = Date.now();

    if (!game.canPlay(now)) {
      return;
    }

    game.start(now);
    set({ state: game.getState(), countdownSecondsLeft: 5 });

    clearTimers();

    let secondsLeft = 5;
    countdownTimer = setInterval(() => {
      secondsLeft -= 1;

      if (secondsLeft <= 0) {
        clearInterval(countdownTimer!);

        countdownTimer = null;

        game.completeCountdown();

        const active = game.getActiveTheme();

        set({
          state: game.getState(),
          activeTheme: active?.id ?? null,
          countdownSecondsLeft: null,
          themeSecondsLeft: 10,
        });

        startThemeTimer();
      } else {
        set({ countdownSecondsLeft: secondsLeft });
      }
    }, 1000);
  },

  applyTheme: () => {
    const { game } = get();
    clearTimers();
    game.applyTheme();
    set({
      state: game.getState(),
      currentTheme: game.getCurrentTheme().id,
      activeTheme: null,
      themeSecondsLeft: null,
    });
  },

  resetTheme: () => {
    const { game } = get();
    clearTimers();
    game.resetTheme();
    set({
      state: game.getState(),
      currentTheme: game.getCurrentTheme().id,
      activeTheme: null,
      themeSecondsLeft: null,
    });
  },
}));

function startThemeTimer() {
  const { game } = useGameStore.getState();
  let secondsLeft = 10;

  themeTimer = setInterval(() => {
    secondsLeft -= 1;

    if (secondsLeft <= 0) {
      clearInterval(themeTimer!);
      themeTimer = null;
      const now = Date.now();
      game.handleThemeTimeout(now);
      const newState = game.getState();
      const active = game.getActiveTheme();

      if (newState === 'cooldown') {
        let cooldownSecondsLeft = Math.round(COOLDOWN_DURATION_MS / 1000);
        useGameStore.setState({
          state: newState,
          currentTheme: game.getCurrentTheme().id,
          activeTheme: null,
          themeSecondsLeft: null,
          cooldownActive: true,
          cooldownSecondsLeft,
        });
        cooldownTimer = setInterval(() => {
          cooldownSecondsLeft -= 1;

          if (cooldownSecondsLeft <= 0) {
            clearInterval(cooldownTimer!);
            cooldownTimer = null;
            useGameStore.setState({ cooldownActive: false, cooldownSecondsLeft: null });
          } else {
            useGameStore.setState({ cooldownSecondsLeft });
          }
        }, 1000);
      } else {
        useGameStore.setState({
          state: newState,
          activeTheme: active?.id ?? null,
          themeSecondsLeft: 10,
        });
        startThemeTimer();
      }
    } else {
      useGameStore.setState({ themeSecondsLeft: secondsLeft });
    }
  }, 1000);
}
