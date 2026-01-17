'use client';

import React, { useState } from 'react';
import './SocialBubble.css';

// Simple SVGs for social icons to keep it lightweight
const Icons = {
    Plus: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
        </svg>
    ),
    Close: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    ),
    Twitter: () => (
        <img src="/XLogo.png" alt="X" className="social-icon-img" width="20" height="20" />
    ),
    Instagram: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    ),
    Linkedin: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    ),
    Github: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2.68-5.43-3" />
        </svg>
    ),
    Mail: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    ),
    Youtube: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
    ),
    Behance: () => (
        <img src="/BehanceLogo.png" alt="Behance" className="social-icon-img" width="20" height="20" />
    ),
    Linktree: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    )
};

export default function SocialBubble() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const socialLinks = [
        { icon: <Icons.Github />, href: "https://github.com", label: "GitHub", color: "#333" },
        { icon: <Icons.Linkedin />, href: "https://www.linkedin.com/company/transcend-frames/?viewAsMember=true", label: "Linkedin", color: "#0077b5" },
        // { icon: <Icons.Twitter />, href: "https://twitter.com", label: "Twitter", color: "#1da1f2" },
        { icon: <Icons.Instagram />, href: "https://www.instagram.com/transcend.frames/", label: "Instagram", color: "#e1306c" },
        { icon: <Icons.Youtube />, href: "https://www.youtube.com/@mananshahstudio", label: "YouTube", color: "#ff0000" },
        { icon: <Icons.Behance />, href: "https://behance.net", label: "Behance", color: "#1769ff" },
        { icon: <Icons.Linktree />, href: "https://linktr.ee/MananPortfolio", label: "Linktree", color: "#43E660" },
        { icon: <Icons.Mail />, href: "mailto:hello@transcendframes.com", label: "Email", color: "#ea4335" }
    ];

    return (
        <div className={`social-bubble-container ${isOpen ? 'open' : ''}`}>

            {/* Social Items List */}
            <div className="social-bubble-items">
                {socialLinks.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-bubble-item"
                        style={{
                            transitionDelay: `${isOpen ? (socialLinks.length - index) * 50 : 0}ms`,
                            '--hover-color': item.color
                        }}
                        aria-label={item.label}
                    >
                        {item.icon}
                        <span className="social-tooltip">{item.label}</span>
                    </a>
                ))}
            </div>

            {/* Main Toggle Button */}
            <button
                className="social-bubble-toggle"
                onClick={toggleMenu}
                aria-label="Toggle Social Menu"
            >
                <span className="connect-text">Connect Now</span>
                <div className="icon-wrapper">
                    {isOpen ? <Icons.Close /> : <Icons.Plus />}
                </div>
            </button>

        </div>
    );
}
