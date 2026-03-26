// frontend/src/views/components/Residential.jsx
import React, { useState, useEffect } from 'react';
import { useProperties } from '../../controllers/useProperties';
import '../../styles/CategorySection.css';

const Residential = () => {
  const [activeType, setActiveType] = useState('sale');
  const { properties, loading } = useProperties('residential', activeType);

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#residential-sale')   setActiveType('sale');
      else if (hash === '#residential-resale') setActiveType('resale');
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section id="residential" className="category-section">
      <div className="category-container">
        <h2 className="category-title">🏠 Residential Properties</h2>

        <div className="type-tabs">
          {[['sale', '🏡 For Sale'], ['resale', '🔄 Resale']].map(([type, label]) => (
            <button
              key={type}
              className={`type-tab ${activeType === type ? 'active' : ''}`}
              onClick={() => setActiveType(type)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="properties-grid">
          {loading ? (
            <div className="loading">Loading properties...</div>
          ) : properties.length === 0 ? (
            <div className="no-properties">No residential properties available for {activeType}</div>
          ) : (
            properties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                  <div className="property-badge">{activeType}</div>
                </div>
                <div className="property-content">
                  <h3 className="property-title">🏠 {property.title}</h3>
                  <p className="property-location">📍 {property.location}</p>
                  <div className="property-details">
                    <div className="property-price">₹{property.price}</div>
                    {property.area && <div className="property-area">{property.area}</div>}
                  </div>
                  {property.description && (
                    <p className="property-description">{property.description}</p>
                  )}
                  <div className="property-actions">
                    <button className="btn-view-details">📋 View Details</button>
                    {property.map_url && (
                      <a href={property.map_url} target="_blank" rel="noopener noreferrer" className="btn-view-map">
                        📍 View on Map
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Residential;