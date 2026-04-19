'use client';

import { useState, useCallback } from 'react';
import LogoLockup from '@/components/shared/LogoLockup';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  links: NavLink[];
}

export default function SubpageNav({ links }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <nav className="gm-nav">
        <div className="gm-nav__inner">
          <a href="/" aria-label="Home">
            <LogoLockup />
          </a>
          <div className="gm-nav__links">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <button
            className={`gm-burger ${open ? 'gm-burger--open' : ''}`}
            onClick={toggle}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="gm-burger__line" />
            <span className="gm-burger__line" />
            <span className="gm-burger__line" />
          </button>
        </div>
      </nav>

      <div
        className={`gm-overlay ${open ? 'gm-overlay--open' : ''}`}
        onClick={close}
      >
        <div className="gm-overlay__inner" onClick={(e) => e.stopPropagation()}>
          <div className="gm-overlay__links">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="gm-overlay__link"
                onClick={close}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
              >
                <span className="gm-overlay__link-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
