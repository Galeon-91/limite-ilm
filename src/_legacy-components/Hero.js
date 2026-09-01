import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="floating-elements">
          <div className="floating-element element-1">
            <i className="fas fa-atom"></i>
          </div>
          <div className="floating-element element-2">
            <i className="fas fa-dna"></i>
          </div>
          <div className="floating-element element-3">
            <i className="fas fa-flask"></i>
          </div>
          <div className="floating-element element-4">
            <i className="fas fa-microscope"></i>
          </div>
          <div className="floating-element element-5">
            <i className="fas fa-satellite"></i>
          </div>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-text" data-aos="fade-up">
          <h1 className="hero-title">
            Descubre la
            <span className="gradient-text"> Ciencia </span>
            en el
            <span className="gradient-text"> Islam</span>
          </h1>
          <p className="hero-subtitle">
            Exploramos las maravillas científicas mencionadas en el Corán y los Hadices.
            Conectando el conocimiento moderno con la sabiduría divina.
          </p>
          <div className="hero-buttons">
            <Link to="/articulos" className="btn-hero primary">
              <i className="fas fa-book-open"></i>
              Explorar Artículos
            </Link>
            <Link to="/sobre-nosotros" className="btn-hero secondary">
              <i className="fas fa-info-circle"></i>
              Conoce Más
            </Link>
          </div>
        </div>

        <div className="hero-stats" data-aos="fade-up" data-aos-delay="200">
          <div className="stat-card">
            <i className="fas fa-book-reader"></i>
            <h3>50+</h3>
            <p>Artículos Científicos</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-quran"></i>
            <h3>100+</h3>
            <p>Versículos Analizados</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-users"></i>
            <h3>10K+</h3>
            <p>Lectores Mensuales</p>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <p>Desliza para explorar</p>
      </div>
    </section>
  );
};

export default Hero;
