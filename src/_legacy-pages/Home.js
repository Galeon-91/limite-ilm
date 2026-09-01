import React from 'react';
import Hero from '../components/Hero';
import '../styles/Home.css';

const Home = () => {
  const categories = [
    {
      icon: 'fas fa-dna',
      title: 'Biología',
      description: 'Descubre la creación y los organismos vivos',
      color: 'purple',
      count: 15
    },
    {
      icon: 'fas fa-flask',
      title: 'Química',
      description: 'Elementos y compuestos en el Corán',
      color: 'green',
      count: 12
    },
    {
      icon: 'fas fa-atom',
      title: 'Física',
      description: 'Leyes del universo y la materia',
      color: 'blue',
      count: 10
    },
    {
      icon: 'fas fa-satellite',
      title: 'Astronomía',
      description: 'El cosmos y los cuerpos celestes',
      color: 'pink',
      count: 8
    },
    {
      icon: 'fas fa-heartbeat',
      title: 'Medicina',
      description: 'Salud y curación en el Islam',
      color: 'purple',
      count: 14
    },
    {
      icon: 'fas fa-mountain',
      title: 'Geología',
      description: 'La Tierra y sus formaciones',
      color: 'green',
      count: 6
    }
  ];

  const featuredArticles = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
      category: 'Química',
      title: 'Los nobles secretos de la lavanda',
      excerpt: 'Descubre cómo las propiedades del linalool mencionadas en los Hadices se relacionan con la ciencia moderna.',
      date: '15 Nov 2024',
      readTime: '5 min'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',
      category: 'Astronomía',
      title: 'El universo en expansión',
      excerpt: 'El Corán menciona la expansión del universo 1400 años antes de que la ciencia lo descubriera.',
      date: '12 Nov 2024',
      readTime: '7 min'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
      category: 'Biología',
      title: 'El desarrollo embrionario',
      excerpt: 'Las etapas del desarrollo humano descritas con precisión en el Corán.',
      date: '10 Nov 2024',
      readTime: '6 min'
    }
  ];

  return (
    <div className="home">
      <Hero />

      {/* Sección de Categorías */}
      <section className="categories-section section-padding">
        <div className="container-custom">
          <div className="section-title" data-aos="fade-up">
            <h2>Explora por Categorías</h2>
            <p className="section-subtitle">
              Navega por las diferentes áreas del conocimiento científico
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`category-card ${category.color}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="category-icon">
                  <i className={category.icon}></i>
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="category-count">
                  {category.count} artículos
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Artículos Destacados */}
      <section className="featured-section section-padding">
        <div className="container-custom">
          <div className="section-title" data-aos="fade-up">
            <h2>Artículos Destacados</h2>
            <p className="section-subtitle">
              Los temas más recientes y populares
            </p>
          </div>

          <div className="featured-grid">
            {featuredArticles.map((article, index) => (
              <div 
                key={article.id} 
                className="featured-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="featured-image">
                  <img src={article.image} alt={article.title} />
                  <span className="featured-category">{article.category}</span>
                </div>
                <div className="featured-content">
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="featured-meta">
                    <span><i className="far fa-calendar"></i> {article.date}</span>
                    <span><i className="far fa-clock"></i> {article.readTime}</span>
                  </div>
                  <a href={`/articulo/${article.id}`} className="read-more">
                    Leer más <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5" data-aos="fade-up">
            <a href="/articulos" className="btn-primary-custom">
              Ver todos los artículos
              <i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Sección de Metodología */}
      <section className="methodology-section section-padding gradient-bg-multi">
        <div className="container-custom">
          <div className="methodology-content" data-aos="fade-up">
            <div className="methodology-text">
              <h2>Nuestra Metodología</h2>
              <p>
                En LÍMITE ILM, conectamos los descubrimientos científicos modernos con 
                las enseñanzas del Corán y los Hadices. Nuestro objetivo es mostrar la 
                armonía entre la fe y la ciencia.
              </p>
              <ul className="methodology-list">
                <li>
                  <i className="fas fa-check-circle"></i>
                  Análisis riguroso de versículos y hadices
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  Investigación científica actualizada
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  Explicaciones claras y accesibles
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  Referencias verificables
                </li>
              </ul>
              <a href="/sobre-nosotros" className="btn-secondary-custom">
                Conoce más sobre nosotros
              </a>
            </div>
            <div className="methodology-image">
              <img 
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800" 
                alt="Metodología" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
