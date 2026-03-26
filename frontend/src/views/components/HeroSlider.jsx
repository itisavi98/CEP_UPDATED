// frontend/src/views/components/HeroSlider.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/HeroSlider.css';

const slides = [
  {
    id: 1,
    title: "Find Your Dream Home",
    subtitle: "Luxury Living Spaces in Prime Locations",
    description: "Discover premium properties with world-class amenities",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    cta: "Explore Projects",
    stats: { value: "500+", label: "Happy Families" },
  },
  {
    id: 2,
    title: "Premium Residential Projects",
    subtitle: "Where Comfort Meets Elegance",
    description: "Experience the perfect blend of modern design and comfort",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    cta: "View Properties",
    stats: { value: "50+", label: "Projects Delivered" },
  },
  {
    id: 3,
    title: "Invest in Your Future",
    subtitle: "Smart Real Estate Investments",
    description: "Quality homes with excellent returns and appreciation",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80",
    cta: "Contact Us",
    stats: { value: "25+", label: "Years Experience" },
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero-slider" id="home">
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <div className="content-wrapper">
                <div className="slide-badge">{slide.stats.label}</div>
                <h1 className="slide-title">{slide.title}</h1>
                <h2 className="slide-subtitle">{slide.subtitle}</h2>
                <p className="slide-description">{slide.description}</p>
                <div className="slide-actions">
                  <a href="#projects" className="cta-primary">
                    {slide.cta}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href="#contact" className="cta-secondary">Schedule Visit</a>
                </div>
                <div className="slide-stat">
                  <div className="stat-value">{slide.stats.value}</div>
                  <div className="stat-label">{slide.stats.label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous slide">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="slider-nav next" onClick={nextSlide} aria-label="Next slide">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="dot-progress"></span>
          </button>
        ))}
      </div>

      <div className="scroll-indicator">
        <div className="scroll-text">Scroll Down</div>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default HeroSlider;