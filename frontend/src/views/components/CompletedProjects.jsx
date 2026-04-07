// frontend/src/views/components/CompletedProjects.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCompletedProjects } from '../../controllers/useProjects';
import '../../styles/CompletedProjects.css';

/* ─── Icons ─────────────────────────────────────────────────── */
const IconPin = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconMap = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);

const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const IconChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const IconChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const IconCheckBadge = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Skeleton Card ─────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="cp-card cp-card--skeleton">
    <div className="cp-card__image-wrap cp-skeleton-block" />
    <div className="cp-card__body">
      <div className="cp-skeleton-line cp-skeleton-line--short" />
      <div className="cp-skeleton-line" />
      <div className="cp-skeleton-line cp-skeleton-line--medium" />
    </div>
  </div>
);

/* ─── Project Card ──────────────────────────────────────────── */
const ProjectCard = ({ project }) => (
  <div className="cp-card">
    <div className="cp-card__image-wrap">
      <img
        src={project.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80'}
        alt={project.title}
        loading="lazy"
        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80'; }}
      />
      <div className="cp-card__image-overlay" />
      <span className="cp-card__badge">
        <IconCheckBadge /> Completed
      </span>
    </div>

    <div className="cp-card__body">
      <div className="cp-card__meta-row">
        {project.location && (
          <span className="cp-meta-chip cp-meta-chip--location">
            <IconPin /> {project.location}
          </span>
        )}
        {project.year && (
          <span className="cp-meta-chip cp-meta-chip--year">
            <IconCalendar /> {project.year}
          </span>
        )}
      </div>

      <h3 className="cp-card__title">{project.title}</h3>

      {project.description && (
        <p className="cp-card__desc">{project.description}</p>
      )}

      <div className="cp-card__actions">
        {project.map_url && (
          <button
            className="cp-btn cp-btn--map"
            onClick={() => window.open(project.map_url, '_blank')}
          >
            <IconMap /> View Location
          </button>
        )}
        {project.details_url && (
          <a
            href={project.details_url}
            className="cp-btn cp-btn--details"
            target="_blank"
            rel="noopener noreferrer"
          >
            Details <IconArrow />
          </a>
        )}
      </div>
    </div>
  </div>
);

/* ─── Main Component ────────────────────────────────────────── */
const CompletedProjects = () => {
  const { projects, loading, error } = useCompletedProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [isPaused, setIsPaused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const intervalRef = useRef(null);
  const CARDS_PER_VIEW = useRef(3);
  const INTERVAL_MS = 4000;

  // Responsive cards per view
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) CARDS_PER_VIEW.current = 1;
      else if (window.innerWidth < 1024) CARDS_PER_VIEW.current = 2;
      else CARDS_PER_VIEW.current = 3;
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalSlides = Math.max(0, projects.length - CARDS_PER_VIEW.current + 1);

  const goNext = useCallback(() => {
    if (isAnimating || projects.length <= CARDS_PER_VIEW.current) return;
    setDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % totalSlides);
      setIsAnimating(false);
    }, 420);
  }, [isAnimating, projects.length, totalSlides]);

  const goPrev = useCallback(() => {
    if (isAnimating || projects.length <= CARDS_PER_VIEW.current) return;
    setDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
      setIsAnimating(false);
    }, 420);
  }, [isAnimating, projects.length, totalSlides]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || loading || projects.length <= CARDS_PER_VIEW.current || showAll) return;
    intervalRef.current = setInterval(goNext, INTERVAL_MS);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, loading, projects.length, showAll, goNext]);

  const visibleProjects = showAll
    ? projects
    : projects.slice(currentIndex, currentIndex + CARDS_PER_VIEW.current);

  /* ── Loading ── */
  if (loading) {
    return (
      <div id="projects">
        <section className="cp-section">
          <div className="cp-header">
            <div className="cp-header__left">
              <span className="cp-eyebrow">Our Work</span>
              <h2 className="cp-title">Completed Projects</h2>
            </div>
          </div>
          <div className="cp-track">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        </section>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div id="projects">
        <section className="cp-section">
          <div className="cp-header">
            <div className="cp-header__left">
              <span className="cp-eyebrow">Our Work</span>
              <h2 className="cp-title">Completed Projects</h2>
            </div>
          </div>
          <div className="cp-empty">
            <p className="cp-empty__text" style={{ color: '#ef4444' }}>Error: {error}</p>
          </div>
        </section>
      </div>
    );
  }

  /* ── Empty ── */
  if (!projects.length) {
    return (
      <div id="projects">
        <section className="cp-section">
          <div className="cp-header">
            <div className="cp-header__left">
              <span className="cp-eyebrow">Our Work</span>
              <h2 className="cp-title">Completed Projects</h2>
            </div>
          </div>
          <div className="cp-empty">
            <p className="cp-empty__text">No completed projects available at the moment.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div id="projects">
      <section className="cp-section">

        {/* Header */}
        <div className="cp-header">
          <div className="cp-header__left">
            <span className="cp-eyebrow">Our Work</span>
            <h2 className="cp-title">Completed Projects</h2>
            <p className="cp-subtitle">Delivering excellence across every project we undertake</p>
          </div>

          <div className="cp-header__right">
            {projects.length > CARDS_PER_VIEW.current && !showAll && (
              <div className="cp-controls">
                <button className="cp-control-btn" onClick={goPrev} aria-label="Previous">
                  <IconChevronLeft />
                </button>
                <span className="cp-counter">
                  {currentIndex + 1} / {totalSlides}
                </span>
                <button className="cp-control-btn" onClick={goNext} aria-label="Next">
                  <IconChevronRight />
                </button>
              </div>
            )}
            {projects.length > 3 && (
              <button className="cp-see-all-btn" onClick={() => { setShowAll(!showAll); setCurrentIndex(0); }}>
                {showAll ? '← Show Less' : 'See All →'}
              </button>
            )}
          </div>
        </div>

        {/* Progress dots */}
        {!showAll && totalSlides > 1 && (
          <div className="cp-dots">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                className={`cp-dot ${i === currentIndex ? 'cp-dot--active' : ''}`}
                onClick={() => { setCurrentIndex(i); }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Carousel */}
        <div
          className={`cp-carousel-wrap ${showAll ? 'cp-carousel-wrap--grid' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`cp-track ${!showAll ? `cp-track--animate cp-track--${direction} ${isAnimating ? 'cp-track--sliding' : ''}` : 'cp-track--grid'}`}>
            {visibleProjects.map((project, i) => (
              <ProjectCard key={`${project.id}-${currentIndex}`} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        {!showAll && !isPaused && projects.length > CARDS_PER_VIEW.current && (
          <div className="cp-progress-bar">
            <div
              className="cp-progress-bar__fill"
              key={currentIndex}
              style={{ animationDuration: `${INTERVAL_MS}ms` }}
            />
          </div>
        )}

      </section>
    </div>
  );
};

export default CompletedProjects;