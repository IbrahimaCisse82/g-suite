
import React, { memo } from 'react';
import { useVirtualization } from '@/hooks/useVirtualization';
import { cn } from '@/lib/utils';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
}

function VirtualizedListComponent<T>({
  items,
  itemHeight,
  height,
  renderItem,
  className,
  overscan = 5
}: VirtualizedListProps<T>) {
  const {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    visibleRange
  } = useVirtualization(items, {
    itemHeight,
    containerHeight: height,
    overscan
  });

  return (
    <div
      className={cn('overflow-auto', className)}
      style={{ height }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={visibleRange.startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, visibleRange.startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const VirtualizedList = memo(VirtualizedListComponent) as typeof VirtualizedListComponent;
