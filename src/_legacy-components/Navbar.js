import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-container">
            <span className="logo-text">LÍMITE</span>
            <span className="logo-accent">ILM</span>
          </div>
          <span className="logo-subtitle">Cuestión de química</span>
        </Link>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/')}`}
            onClick={closeMenu}
          >
            <i className="fas fa-home"></i>
            <span>Inicio</span>
          </Link>

          <Link 
            to="/articulos" 
            className={`navbar-link ${isActive('/articulos')}`}
            onClick={closeMenu}
          >
            <i className="fas fa-book"></i>
            <span>Artículos</span>
          </Link>

          <Link 
            to="/exploradores" 
            className={`navbar-link ${isActive('/exploradores')}`}
            onClick={closeMenu}
          >
            <i className="fas fa-search"></i>
            <span>Exploradores</span>
          </Link>

          <Link 
            to="/sobre-nosotros" 
            className={`navbar-link ${isActive('/sobre-nosotros')}`}
            onClick={closeMenu}
          >
            <i className="fas fa-info-circle"></i>
            <span>Sobre Nosotros</span>
          </Link>

          <Link 
            to="/contacto" 
            className={`navbar-link ${isActive('/contacto')}`}
            onClick={closeMenu}
          >
            <i className="fas fa-envelope"></i>
            <span>Contacto</span>
          </Link>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`bar ${menuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
