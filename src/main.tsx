import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/cutive-mono/400.css';
import '@fontsource/skranji/400.css';
import '@fontsource/skranji/700.css';
import '@fontsource/nova-oval/400.css';
import '@fontsource/modern-antiqua/400.css';
import '@fontsource/macondo-swash-caps/400.css';
import '@fontsource/ubuntu-mono/400.css';
import '@fontsource/ubuntu-mono/700.css';
import '@fontsource/ubuntu-mono/400-italic.css';
import '@fontsource/ubuntu-mono/700-italic.css';
import './index.css';
import App from './App.tsx';
import './i18n/i18n';
import { useGameStore } from './store/useGameStore';

// Test hook: the Playwright layout suite runs against `vite build --mode e2e`
// and uses the store to preview every Hero theme without playing the game.
if (import.meta.env.MODE === 'e2e') {
  (window as unknown as { __gameStore: typeof useGameStore }).__gameStore = useGameStore;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
