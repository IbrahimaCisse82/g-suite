
import React, { useState } from 'react';
import { useImageCache } from '@/hooks/useImageCache';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  skeletonClassName?: string;
}

export const OptimizedImage = React.memo(({ 
  src, 
  alt, 
  fallback = '/placeholder-image.png',
  className,
  skeletonClassName,
  ...props 
}: OptimizedImageProps) => {
  const { src: cachedSrc, loading, error } = useImageCache(src);
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <Skeleton 
        className={cn('rounded-lg', skeletonClassName || className)} 
        style={{ aspectRatio: 'inherit' }}
      />
    );
  }

  if (error || imageError) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={cn('opacity-75', className)}
        {...props}
      />
    );
  }

  return (
    <img
      src={cachedSrc}
      alt={alt}
      onError={handleError}
      className={cn(
        'transition-opacity duration-300',
        loading ? 'opacity-0' : 'opacity-100',
        className
      )}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';
