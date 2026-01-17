'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    id: "01",
    title: "Discovery",
    desc: "We immerse ourselves in your brand ecosystem. Through deep-dive workshops and data analysis, we uncover the hidden opportunities that will define your digital trajectory.",
    tags: ["Research", "Strategy", "User Personas"]
  },
  {
    id: "02",
    title: "Architecture",
    desc: "We construct the blueprint. Information architecture, wireframing, and technical feasibility studies ensure a foundation that is both robust and scalable.",
    tags: ["UX Design", "Wireframing", "Tech Stack"]
  },
  {
    id: "03",
    title: "Visual Design",
    desc: "Aesthetics meet psychology. We craft a high-fidelity visual language using liquid motion, glassmorphism, and cinematic typography to captivate your audience.",
    tags: ["UI Design", "Motion", "Design System"]
  },
  {
    id: "04",
    title: "Development",
    desc: "Pixel-perfect execution. Our engineers build with clean, semantic code, ensuring lightning-fast performance and seamless interactivity across all devices.",
    tags: ["Frontend", "Backend", "WebGL"]
  },
  {
    id: "05",
    title: "Launch",
    desc: "The lift-off. We manage the deployment pipeline, perform rigorous QA testing, and ensure your digital presence goes live with zero downtime.",
    tags: ["QA Testing", "Deployment", "Analytics"]
  }
];

const TimelineNode = ({ step, index }) => {
  return (
    <div className="timeline-node">
      {/* Node Dot (Visual only, the active state is handled by the scroll line) */}
      <div className="node-point">
        <div className="inner-dot"></div>
      </div>
      
      {/* Content Card */}
      <motion.div 
        className="node-content glass-panel"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20% 0px -20% 0px" }} // Triggers when near center
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="node-number">{step.id}</span>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
        <div className="node-tags">
          {step.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
      </motion.div>
    </div>
  );
};

export default function ScrollTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"] // Start animation when top of section hits bottom of screen
  });

  // Transform scroll progress into height percentage (0% to 100%)
  const scaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="scroll-timeline-section" ref={containerRef}>
      <div className="container">
        
        {/* Header */}
        <div className="timeline-header">
           <h2 className="section-title">The Evolution</h2>
           <p>A scroll-driven journey through our creation process.</p>
        </div>

        <div className="timeline-track-wrapper">
          {/* THE SCROLL LINE */}
          <div className="main-track">
             {/* The Base Grey Line */}
             <div className="track-base"></div>
             
             {/* The Filling "Liquid Light" Line */}
             <motion.div 
               className="track-fill" 
               style={{ height: scaleY }} // <--- Linked to Scroll
             >
               <div className="track-glow"></div> {/* Moving glow head */}
             </motion.div>
          </div>

          {/* THE STEPS */}
          <div className="nodes-list">
            {steps.map((step, index) => (
              <TimelineNode key={index} step={step} index={index} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}