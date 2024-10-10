import React from 'react';

const VideoAILogo = ({ width = 240, height = 48 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 240 48"
            width={width}
            height={height}
        >
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g transform="translate(24, 24) scale(0.4)">
                <circle cx="0" cy="0" r="50" fill="none" stroke="#7dd3fc" strokeWidth="4" filter="url(#glow)">
                    <animate attributeName="stroke-dasharray" from="0 314.15" to="314.15 0" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="40" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.7">
                    <animate attributeName="stroke-dasharray" from="251.32 0" to="0 251.32" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="30" fill="#0ea5e9" opacity="0.2">
                    <animate attributeName="r" values="28;32;28" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
                </circle>

                <path d="M-10,-15 L20,0 L-10,15 Z" fill="#ffffff">
                    <animate
                        attributeName="d"
                        values="M-10,-15 L20,0 L-10,15 Z; M-8,-13 L18,0 L-8,13 Z; M-10,-15 L20,0 L-10,15 Z"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>

            <text x="64" y="32" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#ffffff" filter="url(#glow)">zVideo AI</text>

            <g transform="translate(24, 24) scale(0.4)">
                <circle cx="60" cy="0" r="4" fill="#4ade80">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 0 0"
                        to="360 0 0"
                        dur="5s"
                        repeatCount="indefinite"
                    />
                </circle>
            </g>
        </svg>
    );
};

export default VideoAILogo;