'use client';
import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Safety check: If canvas doesn't exist, stop.
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set explicit size to prevent 0x0 errors
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let width = canvas.width;
    let height = canvas.height;
    let particles = [];
    let animationFrameId;
    
    const particleCount = 60;
    const connectionDistance = 150;
    const mouseDistance = 200;
    let mouse = { x: null, y: null };

    const handleMouseMove = (e) => { mouse.x = e.x; mouse.y = e.y; };
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * width; this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1; this.baseColor = 'rgba(255, 255, 255, 0.5)';
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        let dx = mouse.x - this.x; let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouseDistance) {
          const force = (mouseDistance - distance) / mouseDistance;
          this.x -= (dx / distance) * force * 2; this.y -= (dy / distance) * force * 2;
        }
      }
      draw() { ctx.fillStyle = this.baseColor; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }

    function init() { particles = []; for (let i = 0; i < particleCount; i++) particles.push(new Particle()); }
    
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(); particles[i].draw();
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x; let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx*dx + dy*dy);
          if (distance < connectionDistance) {
            let opacity = 1 - (distance / connectionDistance);
            let gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            gradient.addColorStop(0, `rgba(121, 40, 202, ${opacity})`); 
            gradient.addColorStop(1, `rgba(0, 212, 255, ${opacity})`);
            ctx.strokeStyle = gradient; ctx.lineWidth = 1; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init(); 
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}></canvas>;
}