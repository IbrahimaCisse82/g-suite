
import React from 'react';

interface GSuiteLogoProps {
  className?: string;
  size?: number;
}

export const GSuiteLogo = ({ className = "", size = 40 }: GSuiteLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fond avec dégradé professionnel */}
      <defs>
        <linearGradient id="professionalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      
      {/* Cercle de fond principal */}
      <circle cx="50" cy="50" r="45" fill="url(#professionalGradient)" />
      
      {/* Lettre G stylisée et moderne */}
      <path
        d="M30 50 C30 35, 42 25, 55 25 C68 25, 75 32, 75 40 L65 40 C65 37, 62 35, 55 35 C47 35, 40 42, 40 50 C40 58, 47 65, 55 65 C62 65, 65 62, 65 58 L55 58 L55 50 L75 50 L75 58 C75 68, 68 75, 55 75 C42 75, 30 65, 30 50 Z"
        fill="white"
      />
      
      {/* Élément décoratif moderne */}
      <circle cx="75" cy="25" r="4" fill="url(#accentGradient)" opacity="0.9" />
      <circle cx="25" cy="75" r="2" fill="white" opacity="0.6" />
      
      {/* Reflet subtil */}
      <ellipse cx="40" cy="30" rx="8" ry="4" fill="white" opacity="0.2" />
    </svg>
  );
};
