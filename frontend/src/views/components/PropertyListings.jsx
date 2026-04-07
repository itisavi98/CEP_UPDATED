// frontend/src/views/components/PropertyListings.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useProperties } from '../../controllers/useProperties';
import '../../styles/PropertyListings.css';

/* ─── Category & subtype config ─────────────────────────────── */
const CATEGORY_CONFIG = {
  residential: {
    label: 'Residential',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    subtypes: [
      { key: 'sale',   label: 'For Sale' },
      { key: 'resale', label: 'Resale' },
    ],
    accentColor: '#0ea5e9',
    lightColor:  '#f0f9ff',
  },
  commercial: {
    label: 'Commercial',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    subtypes: [
      { key: 'sale', label: 'For Sale' },
      { key: 'rent', label: 'For Rent' },
    ],
    accentColor: '#6366f1',
    lightColor:  '#f5f3ff',
  },
  plotting: {
    label: 'Plotting',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    ),
    subtypes: [],
    accentColor: '#10b981',
    lightColor:  '#f0fdf4',
  },
};

/* ─── Icons ─────────────────────────────────────────────────── */
const IconPin = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconArea = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18"/>
    <path d="M3 9h18M9 21V9"/>
  </svg>
);

const IconMap = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconSearch = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.4">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const IconFilter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="11" y1="18" x2="13" y2="18"/>
  </svg>
);

/* ─── Property Card ─────────────────────────────────────────── */
const PropertyCard = ({ property, activeType, accentColor, lightColor, index }) => (
  <div
    className="prop-card"
    style={{ '--accent': accentColor, '--light': lightColor, animationDelay: `${index * 0.055}s` }}
  >
    {/* Image */}
    <div className="prop-card__image-wrap">
      <img
        src={property.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80'}
        alt={property.title}
        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80'; }}
      />
      {activeType && (
        <span className="prop-card__badge">{activeType}</span>
      )}
    </div>

    {/* Body */}
    <div className="prop-card__body">
      {/* Info */}
      <div className="prop-card__info">
        <h3 className="prop-card__title">{property.title}</h3>
        <div className="prop-card__location">
          <IconPin />
          {property.location}
        </div>
        {property.description && (
          <p className="prop-card__desc">{property.description}</p>
        )}
      </div>

      {/* Chips */}
      {property.area && (
        <div className="prop-card__chips">
          <span className="prop-card__chip">
            <IconArea />
            {property.area}
          </span>
        </div>
      )}

      {/* Footer */}
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
              <IconMap />
              Map
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Filter Sidebar ────────────────────────────────────────── */
const FilterSidebar = ({
  activeCategory,
  onCategoryChange,
  activeSubtype,
  onSubtypeChange,
  propertyCounts,
}) => {
  const config = CATEGORY_CONFIG[activeCategory];

  return (
    <aside className="filter-sidebar" aria-label="Property filters">

      {/* Category nav */}
      <div className="sidebar-panel" style={{ '--accent': config.accentColor, '--light': config.lightColor }}>
        <span className="sidebar-label">Category</span>
        <nav className="sidebar-nav">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              className={`sidebar-nav-item ${activeCategory === key ? 'active' : ''}`}
              style={{ '--accent': cfg.accentColor, '--light': cfg.lightColor }}
              onClick={() => onCategoryChange(key)}
              aria-pressed={activeCategory === key}
            >
              <span className="sidebar-nav-item__icon">{cfg.icon}</span>
              <span className="sidebar-nav-item__label">{cfg.label}</span>
              {propertyCounts[key] != null && (
                <span className="sidebar-nav-item__count">{propertyCounts[key]}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Subtype filter chips — only shown when subtypes exist */}
      {config.subtypes.length > 0 && (
        <div className="sidebar-panel" style={{ '--accent': config.accentColor, '--light': config.lightColor }}>
          <span className="sidebar-label">Listing Type</span>
          <div className="sidebar-filters">
            {config.subtypes.map(st => (
              <button
                key={st.key}
                className={`sidebar-filter-chip ${activeSubtype === st.key ? 'active' : ''}`}
                onClick={() => onSubtypeChange(st.key)}
                aria-pressed={activeSubtype === st.key}
              >
                <span className="sidebar-filter-chip__dot" />
                {st.label}
              </button>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
};

/* ─── Category panel (content area) ────────────────────────── */
const CategoryPanel = ({ categoryKey, config, activeSubtype }) => {
  const { properties, loading } = useProperties(categoryKey, activeSubtype);
  const [sortBy, setSortBy] = useState('default');

  const activeSubtypeLabel = activeSubtype
    ? config.subtypes.find(s => s.key === activeSubtype)?.label
    : null;

  // Sort properties based on selected sort option
  const sortedProperties = useMemo(() => {
    if (!properties.length) return properties;

    const sorted = [...properties];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'default':
      default:
        return sorted; // Already sorted by created_at desc from service
    }
  }, [properties, sortBy]);

  return (
    <div
      className="listings-content"
      style={{ '--accent': config.accentColor, '--light': config.lightColor }}
    >
      {/* Content toolbar */}
      <div className="content-toolbar">
        <div className="content-toolbar__left">
          <p className="content-toolbar__title">
            {config.label} Properties
            {activeSubtypeLabel ? ` · ${activeSubtypeLabel}` : ''}
          </p>
          {!loading && (
            <p className="content-toolbar__sub">
              {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
            </p>
          )}
        </div>
        <div className="content-toolbar__right">
        <div className="sort-group">
              <span className="sort-group__label"><IconFilter /> Sort By</span>
              {[
                { value: 'default',    label: 'Default' },
                { value: 'price-asc',  label: '↑ Price' },
                { value: 'price-desc', label: '↓ Price' },
                { value: 'newest',     label: 'Newest' },
              ].map(opt => (
                <button
                  key={opt.value}
                  className={`sort-btn ${sortBy === opt.value ? 'sort-btn--active' : ''}`}
                  onClick={() => setSortBy(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
      </div>

      {/* Cards grid */}
      <div className="cards-list">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="prop-card prop-card--skeleton" />
          ))
        ) : sortedProperties.length === 0 ? (
          <div className="empty-state">
            <IconSearch />
            <p>
              No {config.label.toLowerCase()} properties
              {activeSubtypeLabel ? ` for ${activeSubtypeLabel.toLowerCase()}` : ''} available
            </p>
          </div>
        ) : (
          sortedProperties.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              activeType={activeSubtypeLabel}
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
  const [activeSubtypes, setActiveSubtypes] = useState({
    residential: 'sale',
    commercial:  'sale',
    plotting:    null,
  });

  // Optional: track per-category counts to show in sidebar nav
  const [propertyCounts, setPropertyCounts] = useState({
    residential: null,
    commercial:  null,
    plotting:    null,
  });

  // Sync with URL hash
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace('#', '');
      const [category, subtype] = hash.split('-');

      if (CATEGORY_CONFIG[category]) {
        setActiveCategory(category);
        if (subtype && CATEGORY_CONFIG[category].subtypes.some(st => st.key === subtype)) {
          setActiveSubtypes(prev => ({ ...prev, [category]: subtype }));
        }
        document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const config       = CATEGORY_CONFIG[activeCategory];
  const activeSubtype = activeSubtypes[activeCategory];

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    const cfg = CATEGORY_CONFIG[key];
    const defaultSubtype = cfg.subtypes.length > 0 ? cfg.subtypes[0].key : null;
    setActiveSubtypes(prev => ({ ...prev, [key]: defaultSubtype }));
    window.location.hash = defaultSubtype ? `${key}-${defaultSubtype}` : key;
  };

  const handleSubtypeChange = (subtype) => {
    setActiveSubtypes(prev => ({ ...prev, [activeCategory]: subtype }));
    window.location.hash = `${activeCategory}-${subtype}`;
  };

  return (
    <section className="listings-root" id="properties">

      {/* Page header */}
      <div className="listings-header">
        <div
          className="listings-header__pill"
          style={{ color: config.accentColor, background: config.lightColor }}
        >
          {config.icon} Properties
        </div>
        <h2 className="listings-header__title">Browse Our Listings</h2>
        <p className="listings-header__sub">Handpicked properties across top locations</p>
      </div>

      {/* Sidebar + Content */}
      <div className="listings-layout">

        <FilterSidebar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          activeSubtype={activeSubtype}
          onSubtypeChange={handleSubtypeChange}
          propertyCounts={propertyCounts}
        />

        <CategoryPanel
          key={`${activeCategory}-${activeSubtype}`}
          categoryKey={activeCategory}
          config={config}
          activeSubtype={activeSubtype}
        />

      </div>

    </section>
  );
};

export default PropertyListings;