// frontend/src/views/components/Plotting.jsx
import React from 'react';
import { useProperties } from '../../controllers/useProperties';
import '../../styles/CategorySection.css';

const Plotting = () => {
  const { properties, loading } = useProperties('plotting');

  return (
    <section id="plotting" className="category-section">
      <div className="category-container">
        <h2 className="category-title">🏗️ Plotting</h2>

        <div className="properties-grid">
          {loading ? (
            <div className="loading">Loading properties...</div>
          ) : properties.length === 0 ? (
            <div className="no-properties">No plotting properties available</div>
          ) : (
            properties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                  <div className="property-badge">Plotting</div>
                </div>
                <div className="property-content">
                  <h3 className="property-title">🏗️ {property.title}</h3>
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

export default Plotting;