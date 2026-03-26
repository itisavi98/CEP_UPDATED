// frontend/src/views/components/WhatsAppButton.jsx
import React from 'react';
import '../../styles/WhatsAppButton.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WhatsAppButton = () => {
  const phoneNumber = "918149445289";
  const message     = "Hello, I am interested in your real estate projects. Would you please drop details here";
  const link        = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={link} className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppButton;