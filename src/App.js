import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Exploradores from './pages/Exploradores';
import About from './pages/About';
import Contact from './pages/Contact';

// Estilos
import './styles/App.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articulos" element={<Articles />} />
            <Route path="/articulo/:id" element={<ArticleDetail />} />
            <Route path="/exploradores" element={<Exploradores />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
