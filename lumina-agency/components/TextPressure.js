'use client';
import { useEffect, useRef, useState } from 'react';

export default function TextPressure({
  text = "TRANSCEND FRAMES",
  fontFamily = "var(--font-roboto-flex)",
  className = "",
  textColor = "#FFFFFF",
  strokeColor = "#FF0080",
  stroke = false,
  minFontSize = 12,
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true
}) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [spans, setSpans] = useState([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setSpans(text.split(""));
  }, [text]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    let animationFrameId;
    
    const animate = () => {
      const dx = cursorRef.current.x - mouseRef.current.x;
      const dy = cursorRef.current.y - mouseRef.current.y;
      mouseRef.current.x += dx * 0.1;
      mouseRef.current.y += dy * 0.1;

      if (containerRef.current && titleRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };

        const dist = Math.hypot(mouseRef.current.x - center.x, mouseRef.current.y - center.y);
        const maxDist = 800;
        const normalizedDist = Math.max(0, Math.min(1, dist / maxDist));

        const wght = weight ? (1 - normalizedDist) * (900 - 100) + 100 : 400;
        const wdth = width ? (1 - normalizedDist) * (151 - 25) + 25 : 100;
        const ital = italic ? normalizedDist * -10 : 0;
        const opacity = alpha ? 1 - normalizedDist * 0.5 : 1;

        titleRef.current.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'slnt' ${ital}`;
        titleRef.current.style.opacity = opacity;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, weight, italic, alpha]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1 
        ref={titleRef}
        style={{
          fontFamily: fontFamily,
          color: stroke ? 'transparent' : textColor,
          WebkitTextStroke: stroke ? `2px ${strokeColor}` : 'none',
        /* Reduced scaling from 12vw to 5vw to fit the longer text */
          fontSize: `clamp(${minFontSize}px, 5vw, 120px)`,
          whiteSpace: 'nowrap',
          textAlign: 'center',
          lineHeight: 0.8,
          transition: 'all 0.1s ease-out',
          cursor: 'default',
          userSelect: 'none',
          fontVariationSettings: "'wght' 100, 'wdth' 85, 'slnt' 0"
        }}
      >
        {text}
      </h1>
    </div>
  );
}