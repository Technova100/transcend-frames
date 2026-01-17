'use client';
import { useState } from 'react';

const faqData = [
    { q: "What is your typical timeline?", a: "Most branding and web projects take between 4-8 weeks depending on complexity." },
    { q: "Do you offer post-launch support?", a: "Yes, we provide ongoing maintenance and IT support packages." },
    { q: "How do you handle pricing?", a: "We offer project-based pricing tailored to specific deliverables." }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            {faqData.map((item, i) => (
                <div 
                    key={i} 
                    className={`faq-item glass-panel ${activeIndex === i ? 'active' : ''}`}
                    onClick={() => toggle(i)}
                >
                    <div className="faq-question">
                        {item.q} <span className="faq-toggle">+</span>
                    </div>
                    <div className="faq-answer">
                        {item.a}
                    </div>
                </div>
            ))}
        </div>
    );
}