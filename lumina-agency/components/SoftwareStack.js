import React from 'react';
import './SoftwareStack.css';

const softwareCategories = [
    {
        title: "Video Post-Production",
        items: [
            { name: 'DaVinci Resolve', icon: '/Logo/vecteezy_davinci-resolve-logo-davinci-resolve-icon-transparent_67941730.png', color: '#FF6B6B' },
            { name: 'Premiere Pro', icon: '/Logo/vecteezy_adobe-premiere-pro-icon_46437285.png', color: '#9999FF' },
            { name: 'Final Cut Pro', icon: '/Logo/final_cut_pro_macos_bigsur_icon_190177.png', color: '#D693FF' },
            { name: 'CapCut', icon: '/Logo/vecteezy_capcut-app-icon-with-transparent-background_56850735.png', color: '#FFFFFF' },
            { name: 'Media Encoder', icon: '/Logo/vecteezy_adobe-media-encoder-logo-with-transparent-background_56850834.png', color: '#9999FF' }
        ]
    },
    {
        title: "Design & Motion",
        items: [
            { name: 'After Effects', icon: '/Logo/vecteezy_adobe-after-effects-icon_46437267.png', color: '#D989FF' },
            { name: 'Photoshop', icon: '/Logo/vecteezy_adobe-photoshop-logo-transparent-background_46437272.png', color: '#31A8FF' },
            { name: 'Canva', icon: '/Logo/vecteezy_canva-app-logo-on-a-transparent-background_56850847.png', color: '#00C4CC' },
            { name: 'Creative Cloud', icon: '/Logo/vecteezy_adobe-creative-cloud-logo_46861637.png', color: '#FF5E5E' },
            { name: 'GIMP', icon: 'https://cdn.simpleicons.org/gimp/white', color: '#FFFFFF' }
        ]
    },
    {
        title: "3D & Spatial",
        items: [
            { name: 'Blender', icon: '/Logo/vecteezy_blender-transparent-background-icon_49116750.png', color: '#FF9F46' },
            { name: 'Cinema 4D', icon: '/Logo/vecteezy_cinema-4d-logo-on-transparent-background_57355808.png', color: '#2D68FF' },
            { name: 'Spline', icon: '/Logo/vecteezy_spline-3d-design-tool-icon-on-a-transparent-background_67672058.png', color: '#F24E1E' }
        ]
    },
    {
        title: "Generative AI",
        items: [
            { name: 'Runway', icon: '/Logo/runway-ai-icon.png', color: '#FFFF00' },
            { name: 'Kling AI', icon: '/Logo/kling-ai-icon-filled-256.webp', color: '#4ADE80' },
            { name: 'ElevenLabs', icon: 'https://cdn.simpleicons.org/elevenlabs/white', color: '#FFFFFF' },
            { name: 'Topaz Video AI', icon: '/Logo/68af97376fbc83545d307491_icon-topaz-video.svg', color: '#3B82F6' },
            { name: 'Veo3', icon: '/Logo/Google-Gemini-Logo-Transparent.png', color: '#60A5FA' },
            { name: 'Nanobanana Pro', icon: '/Logo/gemini-3-brings-advanced-editing-higher-resolution-to-new-nano-banana-pro.webp', color: '#A3E635' }
        ]
    }
];

const SoftwareStack = () => {
    return (
        <div className="software-stack-container">
            <h3>SOFTWARES USED</h3>

            <div className="software-categories-wrapper">
                {softwareCategories.map((category, catIndex) => (
                    <div key={catIndex} className="software-category">
                        <h4 className="category-title">{category.title}</h4>
                        <div className={`software-grid ${category.title === 'Generative AI' ? 'compact-grid' : ''}`}>
                            {category.items.map((sw, index) => (
                                <div key={index} className="software-item" style={{ '--hover-color': sw.color }}>
                                    <div className="software-icon-box">
                                        <img
                                            src={sw.icon}
                                            alt={sw.name}
                                            className="software-icon"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://cdn-icons-png.flaticon.com/512/1042/1042390.png';
                                            }}
                                        />
                                    </div>
                                    <span className="software-name">
                                        {sw.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoftwareStack;
