import { act, fireEvent, render, screen } from '@testing-library/react';
import i18n from '../../i18n/i18n';
import { useGameStore } from '../../store/useGameStore';
import { GameWidget } from './GameWidget';

beforeAll(async () => {
  await i18n.changeLanguage('en');
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  act(() => {
    useGameStore.getState().resetTheme();
  });
  jest.useRealTimers();
});

const startGame = () => {
  render(<GameWidget />);
  fireEvent.click(screen.getByRole('button', { name: 'Play a game?' }));
};

describe('GameWidget', () => {
  it('counts down 5 seconds, then previews a theme with apply / reset', () => {
    startGame();
    expect(screen.getByText('Get ready... 5')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Get ready... 3')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByRole('button', { name: 'Apply this theme' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByText('10s left to decide')).toBeInTheDocument();
  });

  it('keeps the previewed theme when it is applied', () => {
    startGame();
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const previewed = useGameStore.getState().activeTheme;
    expect(previewed).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Apply this theme' }));

    expect(useGameStore.getState().currentTheme).toBe(previewed);
    expect(screen.getByRole('button', { name: 'Play a game?' })).toBeInTheDocument();
  });

  it('goes back to the default theme on reset', () => {
    startGame();
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(useGameStore.getState().currentTheme).toBe('basic');
    expect(screen.getByRole('button', { name: 'Play a game?' })).toBeInTheDocument();
  });
});
