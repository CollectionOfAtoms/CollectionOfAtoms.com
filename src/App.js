import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Sprialator from './pages/Sprialator';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';
import Contact from './pages/Contact';
import Photography from './pages/Photography';
import Music from './pages/Music';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/sprialator" element={<Sprialator />} />
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
          <div>Becoming still and still becoming</div>
          <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="Atom logo" />
          <div>Jesse Caldwell - 2025</div>
        </footer>
      </div>
    </Router>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
