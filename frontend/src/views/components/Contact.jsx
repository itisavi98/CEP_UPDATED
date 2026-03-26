// frontend/src/views/components/Contact.jsx
import React from 'react';
import '../../styles/Contact.css';

// ✅ Fix: contact details sourced from env variables — easy to update without code changes
// Add these to your .env file:
//   VITE_PHONE_NUMBER=+919876543210
//   VITE_EMAIL=info@dreamlandrealty.com
const phoneNumber    = import.meta.env.VITE_PHONE_NUMBER    || '+919876543210';
const email          = import.meta.env.VITE_EMAIL           || 'info@dreamlandrealty.com';

const Contact = () => {

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Let's Connect!</h2>
      <p className="section-subtitle">We're here to help you find your dream property</p>

      <div className="contact-buttons-row">
        <div className="contact-btn call-btn" onClick={() => window.location.href = `tel:${phoneNumber}`}>
          <div className="btn-icon call-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </div>
          <div className="btn-content">
            <h3>Call Us</h3>
            <p>{phoneNumber}</p>
          </div>
        </div>

        <div className="contact-btn email-btn" onClick={() => window.location.href = `mailto:${email}`}>
          <div className="btn-icon email-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <div className="btn-content">
            <h3>Email</h3>
            <p>{email}</p>
          </div>
        </div>
      </div>

      <div className="contact-bottom-section">
        <div className="map-container">
          <h3>Find Us Here</h3>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4753.18573869596!2d73.75952320732752!3d18.65138242049348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76c8fa205%3A0x1b210131915734fd!2sPCCOE%20-%20Pimpri%20Chinchwad%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1770918134229!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0 }}
              allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>

        <div className="location-card">
          <div className="location-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <h3>Visit Our Office</h3>
          <p className="address">301, Business Park, Andheri East, Mumbai, Maharashtra - 400069</p>
          <div className="location-details">
            <div className="detail-item"><span className="detail-icon">📍</span><span>Easy access from main road</span></div>
            <div className="detail-item"><span className="detail-icon">🚗</span><span>Parking available</span></div>
            <div className="detail-item"><span className="detail-icon">🚇</span><span>Near metro station</span></div>
          </div>
        </div>

        <div className="office-hours-card">
          <div className="hours-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
          </div>
          <h3>Office Hours</h3>
          <div className="hours-list">
            <div className="hour-item"><span className="day">Monday - Friday</span><span className="time">9:00 AM - 7:00 PM</span></div>
            <div className="hour-item"><span className="day">Saturday</span><span className="time">10:00 AM - 5:00 PM</span></div>
            <div className="hour-item closed"><span className="day">Sunday</span><span className="time">Closed</span></div>
          </div>
          <div className="availability-badge">
            <span className="pulse-dot"></span>
            <span>Available Now</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;