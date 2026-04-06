// frontend/src/views/components/CompletedProjects.jsx
import React, { useState } from 'react';
import { useCompletedProjects } from '../../controllers/useProjects';
import '../../styles/CompletedProjects.css';

const CompletedProjects = () => {
  const { projects, loading, error } = useCompletedProjects();
  const [showAll, setShowAll] = useState(false);

  if (loading) {
    return (
      <div id="projects">
        <section className="completed-projects">
          <div className="section-header">
            <h2 className="section-title">Completed Projects</h2>
          </div>
          <div className="status-message">Loading projects...</div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div id="projects">
        <section className="completed-projects">
          <div className="section-header">
            <h2 className="section-title">Completed Projects</h2>
          </div>
          <div className="status-message status-error">Error: {error}</div>
        </section>
      </div>
    );
  }

  return (
    <div id="projects">
      <section className="completed-projects">
        <div className="section-header">
          <h2 className="section-title">Completed Projects</h2>
          {projects.length > 3 && (
            <button className="see-all-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? '← Show Less' : 'See All →'}
            </button>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="status-message">No completed projects available at the moment.</div>
        ) : (
          <div className={`projects-container ${showAll ? 'show-all' : ''}`}>
            <div className="projects-grid">
              {projects.map((project) => (
                <div className="project-card" key={project.id}>
                  <div className="project-img">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <div className="project-meta">
                    {project.location && <span className="location">{project.location}</span>}
                    {project.year && <span className="year">{project.year}</span>}
                  </div>
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
                    {project.details_url && (
                      <a
                        href={project.details_url}
                        className="details-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Details
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  </div>
  );
};

export default CompletedProjects;