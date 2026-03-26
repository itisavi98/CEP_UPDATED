// frontend/src/views/components/ScrollToTopButton.jsx
import React, { useEffect, useState } from 'react';
import '../../styles/ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return visible ? (
    <button className="scroll-top" onClick={scrollToTop}>
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  ) : null;
};

export default ScrollToTopButton;