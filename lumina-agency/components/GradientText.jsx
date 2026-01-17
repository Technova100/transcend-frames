import React from 'react';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true
}) {
  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  const gradientColors = [...colors, colors[0]].join(', ');
  const gradient = `linear-gradient(${gradientAngle}, ${gradientColors})`;
  const backgroundSize =
    direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%';
  const animationDirection = yoyo ? 'alternate' : 'normal';
  const pauseClass = pauseOnHover ? 'pause-on-hover' : '';

  return (
    <span
      className={`animated-gradient-text ${showBorder ? 'with-border' : ''} ${pauseClass} ${className}`.trim()}
      aria-hidden={false}
    >
      <span
        className="text-content gradient-animate"
        style={{
          backgroundImage: gradient,
          backgroundSize,
          animationDuration: `${animationSpeed}s`,
          animationDirection
        }}
      >
        {children}
      </span>
    </span>
  );
}
