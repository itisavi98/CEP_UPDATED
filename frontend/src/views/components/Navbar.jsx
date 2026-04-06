// frontend/src/views/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

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

const CATEGORIES = [
  { label: 'Commercial', sub: [{ label: 'For Sale', href: '#commercial-sale' }, { label: 'For Rent', href: '#commercial-rent' }] },
  { label: 'Residential', sub: [{ label: 'New Sale', href: '#residential-sale' }, { label: 'Resale', href: '#residential-resale' }] },
  { label: 'Plotting', sub: [{ label: 'View All', href: '#plotting' }] },
];

const PROJECTS = [
  { label: 'Ongoing Projects', href: '#ongoing' },
  { label: 'Completed Projects', href: '#projects' },
];

const DropdownMenu = ({ items, isNested }) => (
  <div className={`nb-dropdown ${isNested ? 'nb-dropdown--nested' : ''}`}>
    {items.map((item) =>
      item.sub ? (
        <div key={item.label} className="nb-dropdown__group">
          <span className="nb-dropdown__group-label">{item.label}</span>
          {item.sub.map((s) => (
            <a key={s.href} href={s.href} className="nb-dropdown__item nb-dropdown__item--sub">{s.label}</a>
          ))}
        </div>
      ) : (
        <a key={item.href} href={item.href} className="nb-dropdown__item">{item.label}</a>
      )
    )}
  </div>
);

const NavDropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { 
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false); 
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <li 
      className="nb-item nb-item--dropdown" 
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      role="menuitem"
    >
      <button 
        className={`nb-link nb-link--toggle ${open ? 'nb-link--active' : ''}`} 
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <span className={`nb-chevron ${open ? 'nb-chevron--open' : ''}`}><ChevronDown /></span>
      </button>
      <div 
        className={`nb-dropdown-wrap ${open ? 'nb-dropdown-wrap--open' : ''}`}
        role="menu"
        aria-hidden={!open}
      >
        <DropdownMenu items={items} />
      </div>
    </li>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const toggleMobile = (key) =>
    setMobileExpanded((prev) => (prev === key ? null : key));

  const close = () => { setMobileOpen(false); setMobileExpanded(null); };

  return (
    <>
      <nav className={`nb ${scrolled ? 'nb--scrolled' : ''}`}>
        <div className="nb-inner">

          {/* Logo */}
          <a href="#home" className="nb-logo">
            <span className="nb-logo__name">DreamLand</span>
          </a>

          {/* Desktop links */}
          <ul className="nb-menu">
            <li className="nb-item"><a href="#home"  className="nb-link">Home</a></li>
            <li className="nb-item"><a href="#about" className="nb-link">About</a></li>
            <NavDropdown label="Categories" items={CATEGORIES} />
            <NavDropdown label="Projects"   items={PROJECTS}   />
            <li className="nb-item"><a href="#gallery" className="nb-link">Gallery</a></li>
          </ul>

          {/* Right actions */}
          <div className="nb-actions">
            <a href="#contact"       className="nb-btn nb-btn--outline">Contact</a>
            <Link to="/login" className="nb-btn nb-btn--fill">
              <UserIcon /> Login
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className={`nb-burger ${mobileOpen ? 'nb-burger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`nb-overlay ${mobileOpen ? 'nb-overlay--show' : ''}`} onClick={close} />

      {/* Mobile drawer */}
      <div className={`nb-drawer ${mobileOpen ? 'nb-drawer--open' : ''}`}>
        <div className="nb-drawer__inner">
          <ul className="nb-drawer__menu">
            {[{ label: 'Home', href: '#home' }, { label: 'About', href: '#about' }].map((l) => (
              <li key={l.label} className="nb-drawer__item">
                <a href={l.href} className="nb-drawer__link" onClick={close}>{l.label}</a>
              </li>
            ))}

            {/* Categories accordion */}
            <li className="nb-drawer__item">
              <button className="nb-drawer__link nb-drawer__toggle" onClick={() => toggleMobile('cat')}>
                Categories
                <span className={`nb-chevron ${mobileExpanded === 'cat' ? 'nb-chevron--open' : ''}`}><ChevronDown /></span>
              </button>
              <div className={`nb-drawer__sub ${mobileExpanded === 'cat' ? 'nb-drawer__sub--open' : ''}`}>
                {CATEGORIES.map((cat) => (
                  <div key={cat.label} className="nb-drawer__subgroup">
                    <span className="nb-drawer__subgroup-label">{cat.label}</span>
                    {cat.sub.map((s) => (
                      <a key={s.href} href={s.href} className="nb-drawer__sublink" onClick={close}>{s.label}</a>
                    ))}
                  </div>
                ))}
              </div>
            </li>

            {/* Projects accordion */}
            <li className="nb-drawer__item">
              <button className="nb-drawer__link nb-drawer__toggle" onClick={() => toggleMobile('proj')}>
                Projects
                <span className={`nb-chevron ${mobileExpanded === 'proj' ? 'nb-chevron--open' : ''}`}><ChevronDown /></span>
              </button>
              <div className={`nb-drawer__sub ${mobileExpanded === 'proj' ? 'nb-drawer__sub--open' : ''}`}>
                {PROJECTS.map((p) => (
                  <a key={p.href} href={p.href} className="nb-drawer__sublink" onClick={close}>{p.label}</a>
                ))}
              </div>
            </li>

            <li className="nb-drawer__item">
              <a href="#gallery" className="nb-drawer__link" onClick={close}>Gallery</a>
            </li>
          </ul>

          <div className="nb-drawer__footer">
            <a href="#contact"        className="nb-btn nb-btn--outline nb-btn--full" onClick={close}>Contact Us</a>
            <Link to="/login" className="nb-btn nb-btn--fill   nb-btn--full" onClick={close}><UserIcon /> Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;