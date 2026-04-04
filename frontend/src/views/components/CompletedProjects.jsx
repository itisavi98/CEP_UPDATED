// frontend/src/views/components/CompletedProjects.jsx
import React, { useState } from 'react';
import { useCompletedProjects } from '../../controllers/useProjects';
import '../../styles/CompletedProjects.css';

const CompletedProjects = () => {
  const { projects, loading, error } = useCompletedProjects();
  const [showAll, setShowAll] = useState(false);

  if (loading) {
    return (
      <section className="completed-projects" id="projects">
        <h2 className="section-title">Completed Projects</h2>
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading projects...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="completed-projects" id="projects">
        <h2 className="section-title">Completed Projects</h2>
        <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="completed-projects" id="projects">
      <div className="section-header">
        <h2 className="section-title">Completed Projects</h2>
        {projects.length > 3 && (
          <button className="see-all-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? '← Show Less' : 'See All →'}
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No completed projects available at the moment.
        </div>
      ) : (
        <div className={`projects-container ${showAll ? 'show-all' : ''}`}>
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-img">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p className="location">{project.location}</p>
                  <p className="year">{project.year}</p>
                  <p className="description">{project.description}</p>
                  <div className="project-actions">
                    {project.map_url && (
                      <button
                        onClick={() => window.open(project.map_url, '_blank')}
                        className="location-btn"
                      >
                        📍 View on Map
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CompletedProjects;