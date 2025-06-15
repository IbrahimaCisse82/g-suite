
import React from 'react';

interface GrowHubLogoProps {
  size?: number;
  className?: string;
}

export const GrowHubLogo = ({ size = 40, className = "" }: GrowHubLogoProps) => (
  <img
    src="/lovable-uploads/5b81a087-8ac4-47d8-a1a4-d399127d40f3.png"
    alt="Logo GrowHub Sarl"
    width={size}
    height={size}
    className={`object-contain ${className}`}
    style={{ maxWidth: size, maxHeight: size }}
    draggable={false}
  />
);
