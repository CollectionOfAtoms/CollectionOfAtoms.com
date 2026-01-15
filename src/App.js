import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Sprialator from './pages/Sprialator';
import KrampusBot from './pages/KrampusBot';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';
import Contact from './pages/Contact';
import Photography from './pages/Photography';
import Music from './pages/Music';
import { AudioPlayerProvider, useAudioPlayer } from './context/AudioPlayerContext';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const updateOffset = () => {
      const atTop = window.scrollY <= 4;
      document.body.classList.toggle('at-top', atTop);
    };
    updateOffset();
    window.addEventListener('scroll', updateOffset, { passive: true });
    return () => window.removeEventListener('scroll', updateOffset);
  }, []);

  return (
    <AudioPlayerProvider>
      <Router>
        <ScrollToTop />
        <div className="App dark">

          {/* Navigation Bar */}
          <nav className="navbar">
            <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
              <img src="/CollectionOfAtoms_logo/Heart_bold_transparent.svg" alt="Collection of Atoms logo" className="navbar-logo" />
              <span>CollectionOfAtoms</span>
            </NavLink>
            <button className="hamburger" onClick={toggleMenu}>
              ☰
            </button>

            <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
              <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>About Me</NavLink></li>
              <li><NavLink to="/projects" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink></li>
              <li><NavLink to="/blog" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink></li>
              <li><NavLink to="/photography" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Photography</NavLink></li>
              <li><NavLink to="/music" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Music</NavLink></li>
              <li><NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
            </ul>
          </nav>

          <MiniPlayer />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/sprialator" element={<Sprialator />} />
            <Route path="/projects/krampusbot" element={<KrampusBot />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPostPage />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/music" element={<Music />} />
            <Route path="/contact" element={<Contact />} />
            {/* 404 Page */}
            <Route
              path="*"
              element={
                  <div className="page">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you’re looking for doesn’t exist.</p>
                  </div>
              }
              />
          </Routes>
          <footer className="site-footer">
            <div>Still becoming</div>
            <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="Atom logo" />
            <div>Jesse Caldwell - 2026</div>
          </footer>
        </div>
      </Router>
    </AudioPlayerProvider>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MiniPlayer() {
  const { currentTrack, hasPlayer, isPlaying, togglePlay, playNext, playPrevious, progress, seekTo } = useAudioPlayer();
  const { currentTime, duration } = progress;
  const percent = duration ? (currentTime / duration) * 100 : 0;

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!hasPlayer || !currentTrack) return null;

  return (
    <div className="mini-player">
      <div className="mini-player__inner">
        <span className="mini-player__title">{currentTrack.title}</span>
        <div className="mini-player__scrub">
          <span className="mini-player__time">{formatTime(currentTime)}</span>
          <input
            className="mini-player__range"
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(event) => seekTo(Number(event.target.value))}
            style={{ '--progress': `${percent}%` }}
          />
          <span className="mini-player__time">{formatTime(duration)}</span>
        </div>
        <div className="mini-player__controls">
          <button type="button" className="mini-player__button" onClick={playPrevious} aria-label="Previous track">
            <svg className="mini-player__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 5h2v14H6zM16 7l-8 5 8 5V7z" />
            </svg>
          </button>
          <button type="button" className="mini-player__button" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? (
              <svg className="mini-player__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
              </svg>
            ) : (
              <svg className="mini-player__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5l11 7-11 7V5z" />
              </svg>
            )}
          </button>
          <button type="button" className="mini-player__button" onClick={playNext} aria-label="Next track">
            <svg className="mini-player__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 7l8 5-8 5V7zM16 5h2v14h-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
