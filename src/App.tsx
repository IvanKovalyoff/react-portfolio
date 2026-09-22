import { useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { MySkills } from './components/MySkills';
import { MyProjects } from './components/MyProjects';
import { MyContacts } from './components/MyContacts';
import { Footer } from './components/Footer';
import { useGameStore } from './store/useGameStore';

function App() {
  const currentTheme = useGameStore((state) => state.currentTheme);
  const activeTheme = useGameStore((state) => state.activeTheme);
  const gameState = useGameStore((state) => state.state);

  const previewTheme = gameState === 'showingTheme' && activeTheme ? activeTheme : currentTheme;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', previewTheme);
  }, [previewTheme]);

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <AboutMe />
        <MySkills />
        <MyProjects />
        <MyContacts />
      </main>
      <Footer />
    </>
  );
}

export default App;
