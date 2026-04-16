'use client';

import { useEffect, useRef } from 'react';
import LogoLockup from '@/components/shared/LogoLockup';

export default function Preloader() {
  const counterRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let count = 0;
    const countUp = setInterval(() => {
      count += Math.floor(Math.random() * 6) + 1;
      if (count >= 100) {
        count = 100;
        clearInterval(countUp);
      }
      if (counterRef.current) {
        counterRef.current.textContent = String(count).padStart(3, '0');
      }
    }, 50);

    const dismiss = () => {
      count = 100;
      if (counterRef.current) counterRef.current.textContent = '100';
      clearInterval(countUp);
      setTimeout(() => preloaderRef.current?.classList.add('done'), 3000);
      setTimeout(() => {
        if (preloaderRef.current) preloaderRef.current.style.display = 'none';
      }, 4200);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(dismiss);
    } else {
      dismiss();
    }

    return () => clearInterval(countUp);
  }, []);

  return (
    <div className="preloader" id="preloader" ref={preloaderRef}>
      <div className="preloader__half preloader__half--left" />
      <div className="preloader__half preloader__half--right" />
      <div className="preloader__frame" />
      <div className="preloader__corner preloader__corner--tl" />
      <div className="preloader__corner preloader__corner--tr" />
      <div className="preloader__corner preloader__corner--bl" />
      <div className="preloader__corner preloader__corner--br" />
      <div className="preloader__content">
        <div className="preloader__stem" />
        <LogoLockup className="preloader__logo" />
        <div className="preloader__sub">
          Advocate &middot; Customs &amp; Indirect Tax &middot; IRS (Retd.)
        </div>
      </div>
      <div className="preloader__counter" ref={counterRef}>
        000
      </div>
    </div>
  );
}
