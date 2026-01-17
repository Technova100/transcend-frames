'use client'; // This is mandatory
import { useEffect, useRef } from 'react';

export default function Reveal({ children, className = '', style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    // Safety check
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}