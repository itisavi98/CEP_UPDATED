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
const ProjectCard = React.memo(({ project }) => (
  <div className="cp-card">
    <div className="cp-card__image-wrap">
      <img
        src={project.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80'}
        alt={project.title}
        loading="lazy"
        decoding="async"
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
));

/* ─── Infinite Carousel Hook ────────────────────────────────── */
/**
 * Strategy: Clone-based infinite loop
 * Layout: [clone of last N] [real items] [clone of first N]
 * When track reaches a clone edge, we silently jump to the real counterpart
 * (transition: none for 1 frame, then re-enable) — no visible flicker.
 */
function useInfiniteCarousel({ items, cardsPerView, intervalMs, enabled }) {
  const trackRef = useRef(null);
  const isPausedRef = useRef(false);
  const rafRef = useRef(null);
  const timerRef = useRef(null);
  const isTransitioning = useRef(false);

  // Real index (0-based into `items`)
  const [realIndex, setRealIndex] = useState(0);

  // The offset index into the extended list (starts at cardsPerView = skip clones)
  const offsetRef = useRef(cardsPerView);

  const cardWidth = useRef(0); // px, measured at runtime
  const gap = useRef(20);

  // Build extended list: [last N clones] + [items] + [first N clones]
  const extendedItems = React.useMemo(() => {
    if (!items.length) return [];
    const clone = (arr) => arr.map((item, i) => ({ ...item, _cloneKey: i }));
    return [
      ...clone(items.slice(-cardsPerView)),
      ...items,
      ...clone(items.slice(0, cardsPerView)),
    ];
  }, [items, cardsPerView]);

  const totalReal = items.length;

  // Apply transform instantly (no transition) or with transition
  const applyOffset = useCallback((index, animate) => {
    const track = trackRef.current;
    if (!track) return;
    const unit = cardWidth.current + gap.current;
    track.style.transition = animate
      ? 'transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none';
    track.style.transform = `translate3d(${-index * unit}px, 0, 0)`;
  }, []);

  // Measure card width on mount & resize
  const measureCard = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    // Get the carousel wrapper (parent of track)
    const wrap = track.parentElement;
    if (!wrap) return;

    const style = window.getComputedStyle(track);
    const gapPx = parseFloat(style.gap) || 20;
    gap.current = gapPx;

    // Calculate card width so exactly `cardsPerView` cards fill the wrapper
    const totalGap = gapPx * (cardsPerView - 1);
    const wrapWidth = wrap.getBoundingClientRect().width;
    const computed = (wrapWidth - totalGap) / cardsPerView;
    cardWidth.current = computed;

    // Apply width to every card in the track
    const cards = track.querySelectorAll('.cp-card');
    cards.forEach(card => {
      card.style.width = `${computed}px`;
      card.style.minWidth = `${computed}px`;
      card.style.maxWidth = `${computed}px`;
    });

    // Re-apply offset silently
    applyOffset(offsetRef.current, false);
  }, [applyOffset, cardsPerView]);

  useEffect(() => {
    // Small delay to ensure DOM rendered
    const id = setTimeout(measureCard, 50);
    window.addEventListener('resize', measureCard, { passive: true });
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', measureCard);
    };
  }, [measureCard, extendedItems, cardsPerView]);

  // Move to a given extended index with animation
  const moveTo = useCallback((newOffset, newReal) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    offsetRef.current = newOffset;
    setRealIndex(((newReal % totalReal) + totalReal) % totalReal);
    applyOffset(newOffset, true);

    // After transition completes, check if we need to silently jump
    const track = trackRef.current;
    const onEnd = () => {
      track.removeEventListener('transitionend', onEnd);
      isTransitioning.current = false;

      // Jumped past real items into the trailing clones → jump back
      if (offsetRef.current >= totalReal + cardsPerView) {
        offsetRef.current = cardsPerView;
        applyOffset(offsetRef.current, false);
      }
      // Jumped before real items into the leading clones → jump forward
      if (offsetRef.current < cardsPerView) {
        offsetRef.current = totalReal + cardsPerView - 1;
        applyOffset(offsetRef.current, false);
      }
    };
    track.addEventListener('transitionend', onEnd);
  }, [applyOffset, cardsPerView, totalReal]);

  const next = useCallback(() => {
    if (!enabled || totalReal <= cardsPerView) return;
    moveTo(offsetRef.current + 1, offsetRef.current - cardsPerView + 1);
  }, [enabled, totalReal, cardsPerView, moveTo]);

  const prev = useCallback(() => {
    if (!enabled || totalReal <= cardsPerView) return;
    moveTo(offsetRef.current - 1, offsetRef.current - cardsPerView - 1);
  }, [enabled, totalReal, cardsPerView, moveTo]);

  const goTo = useCallback((realIdx) => {
    if (!enabled) return;
    const offset = realIdx + cardsPerView;
    moveTo(offset, realIdx);
  }, [enabled, cardsPerView, moveTo]);

  // Auto-advance with requestAnimationFrame-based timer (avoids setInterval drift)
  useEffect(() => {
    if (!enabled || totalReal <= cardsPerView) return;
    let lastTime = null;

    const tick = (ts) => {
      if (!lastTime) lastTime = ts;
      const elapsed = ts - lastTime;
      if (!isPausedRef.current && elapsed >= intervalMs) {
        lastTime = ts;
        if (!isTransitioning.current) next();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, totalReal, cardsPerView, intervalMs, next]);

  const pause = useCallback(() => { isPausedRef.current = true; }, []);
  const resume = useCallback(() => { isPausedRef.current = false; }, []);

  return { trackRef, extendedItems, realIndex, next, prev, goTo, pause, resume };
}

/* ─── Main Component ────────────────────────────────────────── */
const CompletedProjects = () => {
  const { projects, loading, error } = useCompletedProjects();
  const [showAll, setShowAll] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const INTERVAL_MS = 4000;

  // Responsive cards per view
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  const {
    trackRef, extendedItems, realIndex,
    next, prev, goTo, pause, resume
  } = useInfiniteCarousel({
    items: projects,
    cardsPerView,
    intervalMs: INTERVAL_MS,
    enabled: !showAll && !loading && projects.length > cardsPerView,
  });

  const totalSlides = Math.max(0, projects.length - cardsPerView + 1);

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
            {projects.length > cardsPerView && !showAll && (
              <div className="cp-controls">
                <button className="cp-control-btn" onClick={prev} aria-label="Previous">
                  <IconChevronLeft />
                </button>
                <span className="cp-counter">
                  {realIndex + 1} / {projects.length}
                </span>
                <button className="cp-control-btn" onClick={next} aria-label="Next">
                  <IconChevronRight />
                </button>
              </div>
            )}
            {projects.length > 3 && (
              <button
                className="cp-see-all-btn"
                onClick={() => { setShowAll(s => !s); }}
              >
                {showAll ? '← Show Less' : 'See All →'}
              </button>
            )}
          </div>
        </div>

        {/* Progress dots */}
        {!showAll && totalSlides > 1 && (
          <div className="cp-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`cp-dot ${i === realIndex ? 'cp-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Carousel */}
        {showAll ? (
          <div className="cp-track cp-track--grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div
            className="cp-carousel-wrap"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onTouchStart={pause}
            onTouchEnd={resume}
          >
            <div
              ref={trackRef}
              className="cp-track cp-track--infinite"
            >
              {extendedItems.map((project, i) => (
                <ProjectCard
                  key={`${project.id}-${project._cloneKey ?? 'real'}-${i}`}
                  project={project}
                />
              ))}
            </div>
          </div>
        )}

        {/* Progress bar — CSS-only, key forces restart */}
        {!showAll && projects.length > cardsPerView && (
          <div className="cp-progress-bar">
            <div
              className="cp-progress-bar__fill"
              key={realIndex}
              style={{ animationDuration: `${INTERVAL_MS}ms` }}
            />
          </div>
        )}

      </section>
    </div>
  );
};

export default CompletedProjects;