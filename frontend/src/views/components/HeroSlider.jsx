// frontend/src/views/components/HeroSlider.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../../styles/HeroSlider.css';

// ─── Slide Data ────────────────────────────────────────────────────────────────
const slides = [
  {
    id: 1,
    badge: 'Premium Properties',
    title: 'Find Your Dream Home',
    subtitle: 'Luxury Living Spaces in Prime Locations',
    description:
      'Discover premium properties with world-class amenities, curated for those who appreciate the finest in modern living.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    cta: 'Explore Projects',
    ctaLink: '#projects',
  },
  {
    id: 2,
    badge: 'Projects Delivered',
    title: 'Premium Residential Projects',
    subtitle: 'Where Comfort Meets Elegance',
    description:
      'Experience the perfect blend of modern design and timeless comfort, in locations you will love to call home.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    cta: 'View Properties',
    ctaLink: '#projects',
  },
  {
    id: 3,
    badge: 'Years of Trust',
    title: 'Invest in Your Future',
    subtitle: 'Smart Real Estate Investments',
    description:
      'Quality homes with excellent returns and long-term appreciation, backed by 25 years of industry expertise.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    cta: 'Contact Us',
    ctaLink: '#contact',
  },
];

const SLIDE_INTERVAL = 5000;

// ─── Icon Components ───────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide]     = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  // Navigate to a specific slide
  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 1300); // matches --slide-dur
    },
    [currentSlide, isTransitioning]
  );

  const nextSlide = useCallback(
    () => goToSlide((currentSlide + 1) % slides.length),
    [currentSlide, goToSlide]
  );

  const prevSlide = useCallback(
    () => goToSlide((currentSlide - 1 + slides.length) % slides.length),
    [currentSlide, goToSlide]
  );

  // Auto-play timer — always restarts after any navigation
  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => setCurrentSlide((p) => (p + 1) % slides.length),
      SLIDE_INTERVAL
    );
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [startTimer]);

  // Wrap manual navigation so it also resets the timer
  const handleManualNav = useCallback(
    (fn) => { fn(); startTimer(); },
    [startTimer]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  handleManualNav(prevSlide);
      if (e.key === 'ArrowRight') handleManualNav(nextSlide);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleManualNav, prevSlide, nextSlide]);

  return (
    <section className="hero-slider" id="home" aria-label="Hero image slider">

      {/* ── SLIDES ─────────────────────────────────────────────────────────── */}
      <div className="slides-container">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`slide${isActive ? ' active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={!isActive}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1}: ${slide.title}`}
            >
              {/* Ken Burns zoom layer */}
              <div className="slide-bg-zoom" />

              {/* Dark gradient overlay */}
              <div className="slide-overlay" />

              {/* Two-column content grid */}
              <div className="slide-content">

                {/* LEFT — text content */}
                <div className="content-left">
                  <div className="slide-badge">{slide.badge}</div>

                  <h1 className="slide-title">{slide.title}</h1>
                  <h2 className="slide-subtitle">{slide.subtitle}</h2>
                  <p className="slide-description">{slide.description}</p>

                  <div className="slide-actions">
                    <a href={slide.ctaLink} className="cta-primary">
                      {slide.cta}
                      <ArrowRight />
                    </a>
                    <a href="#contact" className="cta-secondary">
                      Schedule Visit
                    </a>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* ── PREV ARROW ─────────────────────────────────────────────────────── */}
      <button
        className="slider-nav prev"
        onClick={() => handleManualNav(prevSlide)}
        aria-label="Previous slide"
      >
        <ArrowLeft />
      </button>

      {/* ── NEXT ARROW ─────────────────────────────────────────────────────── */}
      <button
        className="slider-nav next"
        onClick={() => handleManualNav(nextSlide)}
        aria-label="Next slide"
      >
        <ArrowRight />
      </button>

      {/* ── PROGRESS DOTS ──────────────────────────────────────────────────── */}
      <div className="slider-dots" role="tablist" aria-label="Slide navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot${index === currentSlide ? ' active' : ''}`}
            onClick={() => handleManualNav(() => goToSlide(index))}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="dot-progress" />
          </button>
        ))}
      </div>

      {/* ── SLIDE COUNTER ──────────────────────────────────────────────────── */}
      <div className="slide-counter" aria-hidden="true">
        <span className="current">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className="sep">/</span>
        <span className="total">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── SCROLL INDICATOR ───────────────────────────────────────────────── */}
      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-text">Scroll Down</span>
        <div className="scroll-line" />
      </div>

    </section>
  );
};

export default HeroSlider;