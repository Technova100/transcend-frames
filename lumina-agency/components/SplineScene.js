'use client';
import { useEffect, useRef } from 'react';

export default function SplineScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let particles = [];
    
    // MOUSE STATE
    let mouse = { x: null, y: null, radius: 150 };

    // --- CONFIGURATION ---
    const particleCount = 80; // More density
    const connectionDist = 120; // Reach of lines
    const mouseDist = 180; // Reach of mouse
    
    // Resize Handler
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    // Mouse Handlers
    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    }

    // Interactive "Burst" on click
    const handleClick = (e) => {
        for(let i=0; i<5; i++){
            particles.push(new Particle(e.x, e.y));
        }
        // Remove extras if too many
        if(particles.length > 150) particles.splice(0, 5);
    }
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('click', handleClick);
    
    resize();

    // Particle Class
    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Base speed
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.baseColor = 'rgba(255, 255, 255, 0.5)';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // INTERACTIVITY: Flee/Attract to mouse
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < mouse.radius) {
                // Gentle push away to create a "bubble" around cursor
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = forceDirectionX * force * 0.5;
                const directionY = forceDirectionY * force * 0.5;
                
                this.x -= directionX;
                this.y -= directionY;
            }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.fill();
      }
    }

    // Initialize
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and Draw Particles
      particles.forEach((p, index) => {
        p.update();
        p.draw();

        // 1. Connect to other Particles
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(121, 40, 202, ${1 - dist / connectionDist})`; // Violet
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // 2. Connect to Mouse
        if (mouse.x != null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < mouseDist) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 0, 128, ${1 - dist / mouseDist})`; // Pink connection to mouse
                ctx.lineWidth = 0.8;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="spline-wrapper" style={{ background: '#030303' }}>
      {/* 1. Deep Background Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #000000 100%)',
        zIndex: 0
      }} />

      {/* 2. The Interactive Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />

      {/* 3. Overlay Fade */}
      <div className="spline-overlay" style={{ zIndex: 2 }}></div>
    </div>
  );
}