
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
      {/* Fond circulaire avec dégradé */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      {/* Cercle de fond */}
      <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
      
      {/* Lettre G stylisée */}
      <path
        d="M30 50 C30 35, 42 25, 55 25 C68 25, 75 32, 75 40 L65 40 C65 37, 62 35, 55 35 C47 35, 40 42, 40 50 C40 58, 47 65, 55 65 C62 65, 65 62, 65 58 L55 58 L55 48 L75 48 L75 58 C75 68, 68 75, 55 75 C42 75, 30 65, 30 50 Z"
        fill="white"
      />
      
      {/* Point décoratif */}
      <circle cx="75" cy="25" r="3" fill="white" opacity="0.8" />
    </svg>
  );
};
