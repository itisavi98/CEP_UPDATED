// frontend/src/views/components/PropertyListings.jsx
import React, { useState, useEffect } from 'react';
import { useProperties } from '../../controllers/useProperties';
import '../../styles/PropertyListings.css';

/* ─── Sub-tab configs per category ─────────────────────────── */
const CATEGORY_CONFIG = {
  residential: {
    label: 'Residential',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    subtypes: [
      { key: 'sale', label: 'For Sale' },
      { key: 'resale', label: 'Resale' },
    ],
    accentColor: '#0ea5e9',
    lightColor: '#f0f9ff',
  },
  commercial: {
    label: 'Commercial',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    subtypes: [
      { key: 'sale', label: 'For Sale' },
      { key: 'rent', label: 'For Rent' },
    ],
    accentColor: '#6366f1',
    lightColor: '#f5f3ff',
  },
  plotting: {
    label: 'Plotting',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    ),
    subtypes: [],
    accentColor: '#10b981',
    lightColor: '#f0fdf4',
  },
};

/* ─── Single property card ──────────────────────────────────── */
const PropertyCard = ({ property, activeType, accentColor, lightColor, index }) => (
  <div
    className="prop-card"
    style={{ '--accent': accentColor, '--light': lightColor, animationDelay: `${index * 0.06}s` }}
  >
    {/* Left: Image */}
    <div className="prop-card__image-wrap">
      <img
        src={property.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80'}
        alt={property.title}
        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80'; }}
      />
      <span className="prop-card__badge">{activeType || 'Available'}</span>
    </div>

    {/* Right: Content */}
    <div className="prop-card__body">

      {/* Top: Title + location */}
      <div className="prop-card__info">
        <h3 className="prop-card__title">{property.title}</h3>
        <div className="prop-card__location">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {property.location}
        </div>
        {property.description && (
          <p className="prop-card__desc">{property.description}</p>
        )}
      </div>

      {/* Mid: Chips row */}
      {property.area && (
        <div className="prop-card__chips">
          <span className="prop-card__chip">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M9 21V9"/>
            </svg>
            {property.area}
          </span>
        </div>
      )}

      {/* Bottom: Price + Actions */}
      <div className="prop-card__footer">
        <div className="prop-card__price-block">
          <span className="prop-card__price-label">Price</span>
          <span className="prop-card__price">₹{property.price}</span>
        </div>
        <div className="prop-card__actions">
          {property.map_url && (
            <a
              href={property.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="prop-card__btn prop-card__btn--ghost"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Map
            </a>
          )}
          <button className="prop-card__btn prop-card__btn--primary">
            View Details
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  </div>
);

/* ─── Category panel ────────────────────────────────────────── */
const CategoryPanel = ({ categoryKey, config }) => {
  const hasSubtypes = config.subtypes.length > 0;
  const [activeSubtype, setActiveSubtype] = useState(hasSubtypes ? config.subtypes[0].key : null);
  const { properties, loading } = useProperties(categoryKey, activeSubtype);

  return (
    <div className="cat-panel" style={{ '--accent': config.accentColor, '--light': config.lightColor }}>

      {/* Subtype pills + count row */}
      <div className="panel-toolbar">
        {hasSubtypes && (
          <div className="subtype-bar">
            {config.subtypes.map(st => (
              <button
                key={st.key}
                className={`subtype-pill ${activeSubtype === st.key ? 'active' : ''}`}
                onClick={() => setActiveSubtype(st.key)}
              >
                {st.label}
              </button>
            ))}
          </div>
        )}
        {!loading && properties.length > 0 && (
          <p className="results-count">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'}
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="cards-list">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="prop-card prop-card--skeleton" />)
        ) : properties.length === 0 ? (
          <div className="empty-state">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <p>No {config.label.toLowerCase()} properties available{activeSubtype ? ` for ${activeSubtype}` : ''}</p>
          </div>
        ) : (
          properties.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              activeType={activeSubtype}
              accentColor={config.accentColor}
              lightColor={config.lightColor}
              index={i}
            />
          ))
        )}
      </div>
    </div>
  );
};

/* ─── Main component ────────────────────────────────────────── */
const PropertyListings = () => {
  const [activeCategory, setActiveCategory] = useState('residential');

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace('#', '').split('-')[0];
      if (CATEGORY_CONFIG[hash]) setActiveCategory(hash);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const config = CATEGORY_CONFIG[activeCategory];

  return (
    <section className="listings-root" id="properties">

      {/* Tab Bar */}
      <div className="mega-tab-bar">
        <div className="mega-tab-bar__inner">
          <span className="mega-tab-bar__label">Browse by</span>
          <div className="mega-tab-bar__tabs">
            {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                className={`mega-tab ${activeCategory === key ? 'active' : ''}`}
                style={{ '--accent': cfg.accentColor, '--light': cfg.lightColor }}
                onClick={() => { setActiveCategory(key); window.location.hash = key; }}
              >
                <span className="mega-tab__icon">{cfg.icon}</span>
                <span className="mega-tab__label">{cfg.label}</span>
                {activeCategory === key && <span className="mega-tab__bar" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="listings-header">
        <div className="listings-header__pill" style={{ color: config.accentColor, background: config.lightColor }}>
          {config.icon} {config.label}
        </div>
        <h2 className="listings-header__title">{config.label} Properties</h2>
        <p className="listings-header__sub">Handpicked listings across top locations</p>
      </div>

      {/* Body */}
      <div className="listings-body">
        <CategoryPanel key={activeCategory} categoryKey={activeCategory} config={config} />
      </div>

    </section>
  );
};

export default PropertyListings;