// frontend/src/views/components/About.jsx
import React from 'react';
import '../../styles/About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About DreamLand Realty</h2>
          <p>
            Established in 2009, DreamLand Realty has been delivering premium
            residential and commercial spaces designed for modern living.
            We focus on quality construction, prime locations, and timely delivery.
          </p>
          <div className="mission-vision">
            <div>
              <h4>Our Mission</h4>
              <p>To create world-class spaces that enhance lifestyle and provide long-term value.</p>
            </div>
            <div>
              <h4>Our Vision</h4>
              <p>To become a trusted real estate brand known for innovation and excellence.</p>
            </div>
          </div>
          <div className="director-message">
            <h4>Director's Message</h4>
            <p>
              "We believe in transparency, trust, and delivering more than promised.
              Our commitment is to build not just homes, but lasting relationships."
            </p>
          </div>
          <p className="certification">RERA Registered | ISO Certified Construction Company</p>
        </div>

        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" alt="About Company" />
        </div>
      </div>

      <div className="stats">
        <div className="stat-box"><h3>500+</h3><p>Happy Families</p></div>
        <div className="stat-box"><h3>20+</h3><p>Projects Completed</p></div>
        <div className="stat-box"><h3>15+</h3><p>Years Experience</p></div>
      </div>
    </section>
  );
};

export default About;