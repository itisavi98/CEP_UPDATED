// frontend/src/views/components/Gallery.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useGallery } from '../../controllers/useGallery';
import '../../styles/Gallery.css';

const SLIDE_INTERVAL = 5000;

const Gallery = () => {
  const { images, loading, error } = useGallery();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused]         = useState(false);
  const [progress, setProgress]         = useState(0);
  const autoPlayRef  = useRef(null);
  const progressRef  = useRef(null);

  useEffect(() => {
    if (images.length > 0 && !isPaused) {
      clearInterval(autoPlayRef.current);
      clearInterval(progressRef.current);
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % images.length);
        setProgress(0);
      }, SLIDE_INTERVAL);
      setProgress(0);
      const increment = 100 / (SLIDE_INTERVAL / 50);
      progressRef.current = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + increment));
      }, 50);
    }
    return () => {
      clearInterval(autoPlayRef.current);
      clearInterval(progressRef.current);
    };
  }, [currentSlide, images, isPaused]);

  const nextSlide = () => { setCurrentSlide(prev => (prev + 1) % images.length); setProgress(0); };
  const prevSlide = () => { setCurrentSlide(prev => (prev - 1 + images.length) % images.length); setProgress(0); };
  const goToSlide = (i) => { setCurrentSlide(i); setProgress(0); };

  if (loading) return (
    <section className="gallery-section">
      <h2 className="gallery-section-title">Project Gallery</h2>
      <p className="gallery-section-subtitle">Explore our stunning portfolio of completed projects</p>
      <div className="gallery-section-loading">Loading gallery...</div>
    </section>
  );

  if (error) return (
    <section className="gallery-section">
      <h2 className="gallery-section-title">Project Gallery</h2>
      <div className="gallery-section-error">Error loading gallery: {error}</div>
    </section>
  );

  if (images.length === 0) return (
    <section className="gallery-section">
      <h2 className="gallery-section-title">Project Gallery</h2>
      <div className="gallery-section-empty">No images in gallery yet.</div>
    </section>
  );

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="gallery-section-title">Project Gallery</h2>
      <p className="gallery-section-subtitle">Explore our stunning portfolio of completed projects</p>

      <div
        className="gallery-carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="gallery-carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <div className={`gallery-carousel-slide ${index === currentSlide ? 'active' : ''}`} key={image.id}>
              <img src={image.src} alt={image.alt || `Gallery ${index + 1}`} className="gallery-carousel-slide-image" />
              <div className="gallery-slide-overlay">
                <div className="gallery-slide-content">
                  {image.category && <span className="gallery-slide-category">{image.category}</span>}
                  <h3 className="gallery-slide-title">{image.title || image.alt || `Project ${index + 1}`}</h3>
                  {image.description && <p className="gallery-slide-description">{image.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-carousel-progress" style={{ width: `${progress}%` }}></div>

        <button className="gallery-carousel-arrow prev" onClick={prevSlide} aria-label="Previous slide">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="gallery-carousel-arrow next" onClick={nextSlide} aria-label="Next slide">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="gallery-carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`gallery-carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="gallery-carousel-thumbnails">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`gallery-carousel-thumbnail ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            <img src={image.src} alt={`Thumbnail ${index + 1}`} className="gallery-carousel-thumbnail-image" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;