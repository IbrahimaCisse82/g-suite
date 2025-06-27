
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Chargement...', 
  fullScreen = false 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const Container = fullScreen ? 'div' : React.Fragment;
  const containerProps = fullScreen ? {
    className: 'fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50'
  } : {};

  return (
    <Container {...containerProps}>
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}>
            <div className="absolute inset-0 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        {text && (
          <p className="text-sm text-gray-600 animate-pulse">{text}</p>
        )}
      </div>
    </Container>
  );
};
