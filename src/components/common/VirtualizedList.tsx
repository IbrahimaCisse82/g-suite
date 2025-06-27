
import React, { memo, useMemo } from 'react';
import { Pagination } from './Pagination';
import { cn } from '@/lib/utils';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
  pagination?: {
    enabled: boolean;
    pageSize?: number;
  };
  onPageChange?: (page: number) => void;
}

function VirtualizedListComponent<T>({
  items,
  itemHeight,
  height,
  renderItem,
  className,
  overscan = 5,
  pagination,
  onPageChange
}: VirtualizedListProps<T>) {
  // Simplify to avoid state management issues for now
  const currentItems = items;
  const currentPage = 1;
  const totalPages = Math.ceil(items.length / (pagination?.pageSize || 50));

  const containerStyle = useMemo(() => ({
    height,
    overflowY: 'auto' as const
  }), [height]);

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className="overflow-auto"
        style={containerStyle}
      >
        <div className="space-y-2">
          {currentItems.map((item, index) => (
            <div
              key={index}
              style={{ minHeight: itemHeight }}
              className="flex items-center"
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {pagination?.enabled && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange || (() => {})}
          canGoPrevious={currentPage > 1}
          canGoNext={currentPage < totalPages}
          className="justify-center"
        />
      )}
    </div>
  );
}

// Create the memoized component with simple typing
const VirtualizedList = memo(VirtualizedListComponent);
VirtualizedList.displayName = 'VirtualizedList';

export { VirtualizedList };
