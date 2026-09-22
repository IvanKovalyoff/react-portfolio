import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/useGameStore';
import { getThemeName } from '../../data/gameThemes';
import type React from 'react';

const NOTIFICATION_VISIBLE_MS = 4000;

export const GameWidget: React.FC = () => {
  const { t } = useTranslation();
  const {
    state,
    activeTheme,
    countdownSecondsLeft,
    themeSecondsLeft,
    cooldownActive,
    cooldownSecondsLeft,
    play,
    applyTheme,
    resetTheme,
  } = useGameStore();

  const [showNotification, setShowNotification] = useState(false);
  const notificationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (notificationTimer.current) {
        clearTimeout(notificationTimer.current);
      }
    };
  }, []);

  const canPress = (state === 'idle' || state === 'cooldown') && !cooldownActive;

  const handlePlayClick = () => {
    if (canPress) {
      play();
      return;
    }

    setShowNotification(true);
    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current);
    }
    notificationTimer.current = setTimeout(() => {
      setShowNotification(false);
    }, NOTIFICATION_VISIBLE_MS);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {(state === 'idle' || state === 'cooldown') && (
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handlePlayClick}
            aria-disabled={!canPress}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              canPress
                ? '[background:var(--gradient-accent)] text-white hover:opacity-90'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {t('game.playPrompt')}
          </button>
          {showNotification && !canPress && cooldownSecondsLeft !== null && (
            <p className="text-sm text-gray-600">
              {t('game.cooldownNotification', {
                minutes: Math.floor(cooldownSecondsLeft / 60),
                seconds: cooldownSecondsLeft % 60,
              })}
            </p>
          )}
        </div>
      )}

      {state === 'countdown' && (
        <p className="text-lg">{t('game.countdown', { seconds: countdownSecondsLeft })}</p>
      )}

      {state === 'showingTheme' && activeTheme && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold">{getThemeName(activeTheme)}</p>
          <p className="text-sm text-gray-400">
            {t('game.themeTimeLeft', { seconds: themeSecondsLeft })}
          </p>
          <div className="flex gap-2">
            <button
              onClick={applyTheme}
              className="px-3 py-1 rounded [background:var(--gradient-accent)] text-white"
            >
              {t('game.applyTheme')}
            </button>
            <button
              onClick={resetTheme}
              className="px-3 py-1 rounded border border-gray-500 text-gray-300"
            >
              {t('game.reset')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
