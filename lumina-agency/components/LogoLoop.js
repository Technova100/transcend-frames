'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo
} from 'react';
import './LogoLoop.css';

const ANIMATION_CONFIG = {
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
};

const toCssLength = v =>
  typeof v === 'number' ? `${v}px` : v ?? undefined;

/* ---------------- Hooks ---------------- */

function useResizeObserver(callback, refs, deps) {
  useEffect(() => {
    if (!refs.every(r => r.current)) return;

    const ro = new ResizeObserver(() => callback());
    refs.forEach(r => ro.observe(r.current));

    callback();
    return () => ro.disconnect();
  }, deps);
}

function useImageLoader(ref, onDone, deps) {
  useEffect(() => {
    const imgs = ref.current?.querySelectorAll('img') ?? [];
    if (!imgs.length) return onDone();

    let remaining = imgs.length;
    const done = () => --remaining === 0 && onDone();

    imgs.forEach(img => {
      img.complete
        ? done()
        : img.addEventListener('load', done, { once: true });
    });

    return () =>
      imgs.forEach(img => img.removeEventListener('load', done));
  }, deps);
}

/* ---------------- Component ---------------- */

const LogoLoopClient = memo(function LogoLoopClient({
  logos,
  speed = 150,
  direction = 'right',
  width = '120%',
  logoHeight = 100,
  gap = 100,
  pauseOnHover = true,
  fadeOut = true,
  fadeOutColor,
  scaleOnHover = true,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style
}) {
  const containerRef = useRef(null);
  const seqRef = useRef(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copies, setCopies] = useState(2);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);

  const update = useCallback(() => {
    if (!containerRef.current || !seqRef.current) return;

    const containerW = containerRef.current.clientWidth;
    const seqW = Math.ceil(seqRef.current.getBoundingClientRect().width);

    if (!seqW) return;

    setSeqWidth(prev => (prev !== seqW ? seqW : prev));

    const needed =
      Math.ceil(containerW / seqW) + ANIMATION_CONFIG.COPY_HEADROOM;

    setCopies(prev =>
      prev !== needed ? Math.max(2, needed) : prev
    );

    setReady(true);
  }, []);

  useResizeObserver(update, [containerRef, seqRef], [
    logos,
    gap,
    logoHeight
  ]);

  useImageLoader(seqRef, update, [
    logos,
    gap,
    logoHeight
  ]);

  const duration = seqWidth
    ? seqWidth / Math.abs(speed || 50)
    : 0;

  const vars = {
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    '--logoloop-duration': `${duration}s`,
    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
  };

  const rootClass = [
    'logoloop',
    ready && 'logoloop--ready',
    hovered && pauseOnHover && 'is-hovered',
    fadeOut && 'logoloop--fade',
    scaleOnHover && 'logoloop--scale-hover',
    className
  ]
    .filter(Boolean)
    .join(' ');

  /* Force measurement check after mount */
  useEffect(() => {
    const timer = setTimeout(() => {
      update();
    }, 100);
    return () => clearTimeout(timer);
  }, [update]);

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={{ width: toCssLength(width), ...vars, ...style }}
      role="region"
      aria-label={ariaLabel}
      data-direction={direction}
    >
      <div
        className="logoloop__track"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {Array.from({ length: copies }).map((_, i) => (
          <ul
            key={i}
            className="logoloop__list"
            ref={i === 0 ? seqRef : null}
            aria-hidden={i > 0}
          >
            {logos.map((item, j) => (
              <li key={`${i}-${j}`} className="logoloop__item">
                {renderItem ? renderItem(item) : (
                  <img {...item} draggable={false} />
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
});

export default LogoLoopClient;
