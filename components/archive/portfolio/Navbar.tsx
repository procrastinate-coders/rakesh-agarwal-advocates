'use client';

import { useEffect, useState } from 'react';
import LogoLockup from '@/components/shared/LogoLockup';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [menuOpen]);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#cases', label: 'Cases' },
    { href: '#offices', label: 'Offices' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="wrap">
          <a href="#top" aria-label="Home">
            <LogoLockup />
          </a>
          <div className="nav__links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} data-hover>
                {l.label}
              </a>
            ))}
            <span className="nav__loc">New Delhi, IN</span>
          </div>
          <button
            className={`nav__burger ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mob-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mob-menu__links">
          {navLinks.map((l, i) => (
            <a key={l.href} href={l.href} className="mob-menu__link" onClick={closeMenu}>
              <em>0{i + 1}</em> &ensp;{l.label}
            </a>
          ))}
        </div>
        <div className="mob-menu__footer">
          <div className="mob-menu__loc">New Delhi &middot; Agra &middot; Bangalore</div>
          <div className="mob-menu__contact">
            <a href="tel:+919818830557">+91 98188 30557</a>
          </div>
        </div>
      </div>
    </>
  );
}
