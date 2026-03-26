// frontend/src/views/components/LoadingSkeletons.jsx
import React from 'react';
import '../../styles/LoadingSkeletons.css';

export const ProjectGridSkeleton = ({ count = 3 }) => (
  <div className="skeleton-grid">
    {Array.from({ length: count }).map((_, idx) => (
      <div className="skeleton-card" key={idx}>
        <div className="skeleton-img" />
        <div className="skeleton-text" />
        <div className="skeleton-small" />
      </div>
    ))}
  </div>
);
