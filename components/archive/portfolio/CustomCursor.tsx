'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      c.style.left = e.clientX + 'px';
      c.style.top = e.clientY + 'px';
    };

    const onEnter = () => c.classList.add('hovering');
    const onLeave = () => c.classList.remove('hovering');

    document.addEventListener('mousemove', onMove);

    const addListeners = () => {
      document
        .querySelectorAll('[data-hover], a, button, .hero__role')
        .forEach((el) => {
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
        });
    };

    // Run once initially and on mutations (for dynamically added elements)
    addListeners();
    const mo = new MutationObserver(addListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      mo.disconnect();
    };
  }, []);

  return <div className="cursor" ref={ref} />;
}
