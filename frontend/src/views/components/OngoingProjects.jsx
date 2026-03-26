// frontend/src/views/components/OngoingProjects.jsx
import React, { useState } from 'react';
import { useOngoingProjects } from '../../controllers/useProjects';
import { ProjectGridSkeleton } from './LoadingSkeletons';
import '../../styles/OngoingProjects.css';

const LocationIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const statusColors = {
  'Under Construction': { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  'Ready to Move':      { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  'Launching Soon':     { bg: '#ede9fe', text: '#5b21b6', dot: '#8b5cf6' },
};

const StatusBadge = ({ status, size = 'md' }) => {
  const colors = statusColors[status] || { bg: '#e5e7eb', text: '#374151', dot: '#9ca3af' };
  return (
    <span className={`op-status-badge op-status-badge--${size}`} style={{ background: colors.bg, color: colors.text }}>
      <span className="op-status-dot" style={{ background: colors.dot }} />
      {status}
    </span>
  );
};

// ── Hero Card (featured project) ─────────────────────────────────────────────
const HeroCard = ({ project }) => {
  return (
    <div className="op-hero">
      <div className="op-hero-img-wrap">
        <img
          src={project.image}
          alt={project.title}
          className="op-hero-img"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Project+Image'; }}
        />
        <div className="op-hero-gradient" />
        <div className="op-hero-noise" />
      </div>

      <div className="op-hero-content">
        <div className="op-hero-top">
          <StatusBadge status={project.status} size="sm" />
        </div>

        <div className="op-hero-bottom">
          <div className="op-hero-tag">Featured Project</div>
          <h2 className="op-hero-title">{project.title}</h2>

          <div className="op-hero-meta">
            <span className="op-hero-loc">
              <LocationIcon />
              {project.location}
            </span>
            <span className="op-hero-divider" />
            {project.possession && (
              <span className="op-hero-detail">
                <span className="op-hero-detail-label">Possession</span>
                {project.possession}
              </span>
            )}
            {project.rera && (
              <>
                <span className="op-hero-divider" />
                <span className="op-hero-detail">
                  <span className="op-hero-detail-label">RERA</span>
                  {project.rera}
                </span>
              </>
            )}
          </div>

          <div className="op-hero-actions">
            {project.map_url && (
              <button
                className="op-btn op-btn--map"
                onClick={() => window.open(project.map_url, '_blank')}
              >
                <MapPinIcon /> View Location
              </button>
            )}
            <a href="/brochure.pdf" className="op-btn op-btn--brochure" download>
              <DownloadIcon /> Brochure
            </a>
            <a href="#contact" className="op-btn op-btn--enquire">
              Enquire Now <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Side List Row ─────────────────────────────────────────────────────────────
const SideRow = ({ project, isActive, onClick }) => {
  return (
    <div
      className={`op-side-row ${isActive ? 'op-side-row--active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="op-side-thumb">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/120x90?text=No+Image'; }}
        />
        {isActive && <div className="op-side-thumb-overlay" />}
      </div>

      <div className="op-side-info">
        <div className="op-side-name">{project.title}</div>
        <div className="op-side-loc">
          <LocationIcon />
          {project.location}
        </div>
        <StatusBadge status={project.status} size="xs" />
      </div>

      <div className="op-side-arrow">
        <ChevronRight />
      </div>
    </div>
  );
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
const HeroSkeleton = () => (
  <section className="ongoing-projects" id="ongoing">
    <div className="op-inner">
      <div className="op-header">
        <div className="op-header-eyebrow" />
        <div className="op-header-title-skel" />
      </div>
      <div className="op-layout">
        <div className="op-hero op-hero--skel" />
        <div className="op-sidebar">
          <div className="op-sidebar-header-skel" />
          {[1,2,3].map(i => (
            <div key={i} className="op-side-row-skel" />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── Main Component ────────────────────────────────────────────────────────────
const OngoingProjects = () => {
  const { projects, loading, error, refetch } = useOngoingProjects();
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading) return <HeroSkeleton />;

  if (error) {
    return (
      <section className="ongoing-projects" id="ongoing">
        <div className="op-inner">
          <div className="op-error">
            <p>Unable to load projects.</p>
            <button onClick={refetch} className="op-retry-btn">Try Again</button>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="ongoing-projects" id="ongoing">
        <div className="op-inner">
          <div className="op-empty">
            <p>No ongoing projects available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const featured  = projects[activeIndex];
  const sideItems = projects.filter((_, i) => i !== activeIndex);

  return (
    <section className="ongoing-projects" id="ongoing">
      <div className="op-inner">

        {/* Section Header */}
        <div className="op-header">
          <span className="op-header-eyebrow">Our Portfolio</span>
          <h2 className="op-header-title">
            Ongoing <span className="op-header-accent">Projects</span>
          </h2>
          <p className="op-header-sub">
            {projects.length} active project{projects.length !== 1 ? 's' : ''} — click any to explore
          </p>
        </div>

        {/* Layout */}
        <div className="op-layout">

          {/* Hero */}
          <HeroCard project={featured} key={featured.id} />

          {/* Sidebar */}
          <aside className="op-sidebar">
            <div className="op-sidebar-header">
              <span className="op-sidebar-label">All Projects</span>
              <span className="op-sidebar-count">{projects.length}</span>
            </div>

            <div className="op-sidebar-list">
              {/* Active project shown at top as summary */}
              <div
                className="op-side-row op-side-row--active op-side-row--current"
                onClick={() => {}}
                role="presentation"
              >
                <div className="op-side-thumb">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/120x90?text=No+Image'; }}
                  />
                </div>
                <div className="op-side-info">
                  <div className="op-side-name">{featured.title}</div>
                  <div className="op-side-loc"><LocationIcon />{featured.location}</div>
                  <StatusBadge status={featured.status} size="xs" />
                </div>
                <div className="op-side-viewing">Viewing</div>
              </div>

              {sideItems.length > 0 && (
                <div className="op-side-divider">
                  <span>Other projects</span>
                </div>
              )}

              {sideItems.map((project) => {
                const originalIndex = projects.findIndex(p => p.id === project.id);
                return (
                  <SideRow
                    key={project.id}
                    project={project}
                    isActive={false}
                    onClick={() => setActiveIndex(originalIndex)}
                  />
                );
              })}
            </div>

            {/* CTA at bottom of sidebar */}
            <div className="op-sidebar-footer">
              <a href="#contact" className="op-sidebar-cta">
                Talk to a consultant <ArrowIcon />
              </a>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default OngoingProjects;