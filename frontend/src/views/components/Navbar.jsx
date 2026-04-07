import '../../styles/Navbar.css';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Icons
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Data Constants
const CATEGORIES = [
  { 
    label: 'Commercial', 
    sub: [{ label: 'For Sale', href: '#commercial-sale' }, { label: 'For Rent', href: '#commercial-rent' }] 
  },
  { 
    label: 'Residential', 
    sub: [{ label: 'New Sale', href: '#residential-sale' }, { label: 'Resale', href: '#residential-resale' }] 
  },
  { 
    label: 'Plotting', 
    sub: [{ label: 'View All', href: '#plotting' }] 
  },
];

const PROJECTS = [
  { label: 'Ongoing Projects', href: '#ongoing' },
  { label: 'Completed Projects', href: '#projects' },
];

const DesktopDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <li 
      className={`nb-menu__item ${isOpen ? 'nb-menu__item--active' : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button className="nb-menu__link">
        {label}
        <span className="nb-chevron"><ChevronDown /></span>
      </button>
      
      {isOpen && (
        <div className="nb-dropdown">
          <div className="nb-dropdown__inner">
            {items.map((item) => (
              <div key={item.label} className="nb-dropdown__group">
                {item.sub ? (
                  <>
                    <span className="nb-dropdown__title">{item.label}</span>
                    {item.sub.map((s) => (
                      <a key={s.href} href={s.href} className="nb-dropdown__link">{s.label}</a>
                    ))}
                  </>
                ) : (
                  <a key={item.href} href={item.href} className="nb-dropdown__link">{item.label}</a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </li>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
  }, [isDrawerOpen]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const close = () => { setIsDrawerOpen(false); setExpandedSection(null); };

  const toggleAccordion = (key) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  return (
    <>

      <nav className={`nb ${isScrolled ? 'nb--scrolled' : ''}`}>
        <div className="nb__container">
          <a href="#home" className="nb-logo" onClick={close}>
            <div className="nb-logo__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="nb-logo__text">DREAM<b>LAND</b></span>
          </a>

          <ul className="nb-menu">
            <li className="nb-menu__item"><a href="#home" className="nb-menu__link">Home</a></li>
            <DesktopDropdown label="Categories" items={CATEGORIES} />
            <DesktopDropdown label="Projects" items={PROJECTS} />
            <li className="nb-menu__item"><a href="#about" className="nb-menu__link">About</a></li>
            <li className="nb-menu__item"><a href="#gallery" className="nb-menu__link">Gallery</a></li>
          </ul>

          <div className="nb-actions">
            <a href="#contact" className="nb-btn">Contact</a>  {/* change here */}
            <Link to="/login" className="nb-login">
              <UserIcon /> <span>Login</span>
            </Link>
          </div>

          <button 
            className={`nb-toggle ${isDrawerOpen ? 'nb-toggle--active' : ''}`} 
            onClick={toggleDrawer}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`nb-drawer ${isDrawerOpen ? 'nb-drawer--open' : ''}`}>
        <div className="nb-drawer__overlay" onClick={close} />
        <div className="nb-drawer__content">
          <ul className="nb-drawer__list">
            <li><a href="#home" className="nb-drawer__link" onClick={close}>Home</a></li>
            <li className="nb-drawer__item">
              <button className="nb-drawer__link" onClick={() => toggleAccordion('cat')}>
                Categories
                <span className={`nb-chevron ${expandedSection === 'cat' ? 'nb-chevron--open' : ''}`}><ChevronDown /></span>
              </button>
              <div className={`nb-drawer__accordion ${expandedSection === 'cat' ? 'nb-drawer__accordion--open' : ''}`}>
                <div className="nb-drawer__accordion-inner">
                  {CATEGORIES.map(cat => (
                    <div key={cat.label} className="nb-drawer__group">
                      <span className="nb-drawer__group-label">{cat.label}</span>
                      {cat.sub.map(s => (
                        <a key={s.href} href={s.href} className="nb-drawer__sublink" onClick={close}>{s.label}</a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="nb-drawer__item">
              <button className="nb-drawer__link" onClick={() => toggleAccordion('proj')}>
                Projects
                <span className={`nb-chevron ${expandedSection === 'proj' ? 'nb-chevron--open' : ''}`}><ChevronDown /></span>
              </button>
              <div className={`nb-drawer__accordion ${expandedSection === 'proj' ? 'nb-drawer__accordion--open' : ''}`}>
                <div className="nb-drawer__accordion-inner">
                  {PROJECTS.map(p => (
                    <a key={p.href} href={p.href} className="nb-drawer__sublink" onClick={close}>{p.label}</a>
                  ))}
                </div>
              </div>
            </li>
            <li><a href="#about" className="nb-drawer__link" onClick={close}>About Us</a></li>
            <li><a href="#gallery" className="nb-drawer__link" onClick={close}>Gallery</a></li>
          </ul>
          <div className="nb-drawer__footer">
            <Link to="/login" className="nb-login" onClick={close}>
              <UserIcon /> <span>Login</span>
            </Link>
            <a href="#contact" className="nb-btn nb-btn--full" onClick={close}>Contact</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;