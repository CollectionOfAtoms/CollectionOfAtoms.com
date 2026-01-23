"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AudioPlayerProvider, useAudioPlayer } from '../context/AudioPlayerContext';

export default function ClientLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((open) => !open);
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

  useEffect(() => {
    window.scrollTo(0, 0);
    closeMenu();
  }, [pathname]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href === '/projects' || href === '/blog') return pathname.startsWith(href);
    return pathname === href;
  };

  return (
    <AudioPlayerProvider>
      <div>
        <nav className="navbar">
          <Link href="/" className="navbar-brand" onClick={closeMenu}>
            <img
              src="/CollectionOfAtoms_logo/Heart_bold_transparent.svg"
              alt="Collection of Atoms logo"
              className="navbar-logo"
            />
            <span>CollectionOfAtoms</span>
          </Link>
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>

          <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <li><Link href="/" onClick={closeMenu} className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link href="/about" onClick={closeMenu} className={isActive('/about') ? 'active' : ''}>About Me</Link></li>
            <li><Link href="/projects" onClick={closeMenu} className={isActive('/projects') ? 'active' : ''}>Projects</Link></li>
            <li><Link href="/blog" onClick={closeMenu} className={isActive('/blog') ? 'active' : ''}>Blog</Link></li>
            <li><Link href="/photography" onClick={closeMenu} className={isActive('/photography') ? 'active' : ''}>Photography</Link></li>
            <li><Link href="/music" onClick={closeMenu} className={isActive('/music') ? 'active' : ''}>Music</Link></li>
            <li><Link href="/contact" onClick={closeMenu} className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
          </ul>
        </nav>

        <MiniPlayer />

        {children}

        <footer className="site-footer">
          <div>Still becoming</div>
          <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="Atom logo" />
          <div>Jesse Caldwell - 2026</div>
        </footer>
      </div>
    </AudioPlayerProvider>
  );
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
