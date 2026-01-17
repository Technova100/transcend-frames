'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, ListTodo, Rocket } from 'lucide-react';
import './ProcessTimeline.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: 'Define Your Vision',
    description: 'Find the perfect plan tailored to your needs, offering the right balance of features, flexibility, and value to help you achieve your goals effortlessly.',
    icon: <Lightbulb size={32} />
  },
  {
    id: 2,
    title: 'Submit Your Request',
    description: 'Easily submit your design requirements through our private design portal, ensuring a seamless process where your vision is understood, refined, and brought to life.',
    icon: <ListTodo size={32} />
  },
  {
    id: 3,
    title: 'Project Delivered',
    description: 'As a expert freelancer, I ensure your project is completed with precision and delivered within 2-3 days. With a keen eye for detail and a passion for quality.',
    icon: <Rocket size={32} />
  }
];

export default function ProcessTimeline() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    // Animate Header
    gsap.fromTo(section.querySelector('.process-header'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    // Animate Cards Staggered
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2, // Stagger effect
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    );

  }, []);

  return (
    <section className="process-section" ref={sectionRef}>
      <div className="container">

        <div className="process-header">
          <div className="process-tag">
            <span className="dot"></span> Design Process
          </div>
          <h2 className="process-title">PROCESS</h2>
          <p className="process-subtitle">
            Crafting bold visuals that inspire and elevate brands with a refined thought process.
          </p>
          <div className="process-actions">
            <button className="btn-process-primary" onClick={() => window.open('https://topmate.io/manan_shah05/', '_blank')}>Book a Free Call</button>
            <button className="btn-process-secondary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>See Projects</button>
          </div>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="process-card"
              ref={el => cardsRef.current[index] = el}
            >
              <div className="process-card-inner">
                <div className="process-card-number">{step.id}</div>
                <div className="process-icon-wrapper">
                  {step.icon}
                </div>
                <h3 className="process-card-title">{step.title}</h3>
                <p className="process-card-desc">{step.description}</p>

                {/* Animated Progress Bar Effect on Card Bottom */}
                <div className="process-card-progress"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}