import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <h3>
              <span className="logo-text">LÍMITE</span>
              <span className="logo-accent">ILM</span>
            </h3>
            <p className="footer-tagline">Cuestión de química entre Ciencia e Islam</p>
          </div>
          <p className="footer-description">
            Exploramos las maravillas de la ciencia a través de los versículos del Corán y Hadices.
            Conectando el conocimiento científico moderno con la sabiduría islámica.
          </p>
          <div className="social-links">
            <a 
              href="https://instagram.com/limite_ilm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href="https://twitter.com/limite_ilm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link twitter"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a 
              href="https://youtube.com/@limite_ilm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link youtube"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Enlaces Rápidos</h4>
          <ul className="footer-links">
            <li><Link to="/"><i className="fas fa-chevron-right"></i> Inicio</Link></li>
            <li><Link to="/articulos"><i className="fas fa-chevron-right"></i> Artículos</Link></li>
            <li><Link to="/exploradores"><i className="fas fa-chevron-right"></i> Exploradores</Link></li>
            <li><Link to="/sobre-nosotros"><i className="fas fa-chevron-right"></i> Sobre Nosotros</Link></li>
            <li><Link to="/contacto"><i className="fas fa-chevron-right"></i> Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Categorías</h4>
          <ul className="footer-links">
            <li><Link to="/articulos?categoria=biologia"><i className="fas fa-dna"></i> Biología</Link></li>
            <li><Link to="/articulos?categoria=quimica"><i className="fas fa-flask"></i> Química</Link></li>
            <li><Link to="/articulos?categoria=fisica"><i className="fas fa-atom"></i> Física</Link></li>
            <li><Link to="/articulos?categoria=astronomia"><i className="fas fa-satellite"></i> Astronomía</Link></li>
            <li><Link to="/articulos?categoria=medicina"><i className="fas fa-heartbeat"></i> Medicina</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Newsletter</h4>
          <p className="footer-newsletter-text">
            Suscríbete para recibir los últimos artículos sobre ciencia e Islam
          </p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="newsletter-input"
              aria-label="Email para newsletter"
            />
            <button type="submit" className="newsletter-btn">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} LÍMITE ILM. Todos los derechos reservados.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacidad">Política de Privacidad</Link>
            <span className="separator">|</span>
            <Link to="/terminos">Términos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
