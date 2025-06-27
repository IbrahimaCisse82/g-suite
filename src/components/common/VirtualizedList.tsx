
import React, { memo, useMemo } from 'react';
import { useVirtualization } from '@/hooks/useVirtualization';
import { usePaginatedData } from '@/hooks/usePagination';
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
  const paginatedResult = usePaginatedData(items, {
    totalItems: items.length,
    pageSize: pagination?.pageSize || 50
  });

  const currentItems = pagination?.enabled ? paginatedResult.data : items;

  const {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    visibleRange
  } = useVirtualization(currentItems, {
    itemHeight,
    containerHeight: height,
    overscan
  });

  const handlePaginationChange = (page: number) => {
    paginatedResult.pagination.goToPage(page);
    onPageChange?.(page);
  };

  const containerStyle = useMemo(() => ({
    height,
    overflowY: 'auto' as const
  }), [height]);

  const innerStyle = useMemo(() => ({
    height: totalHeight,
    position: 'relative' as const
  }), [totalHeight]);

  const contentStyle = useMemo(() => ({
    transform: `translateY(${offsetY}px)`,
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0
  }), [offsetY]);

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className="overflow-auto"
        style={containerStyle}
        onScroll={handleScroll}
      >
        <div style={innerStyle}>
          <div style={contentStyle}>
            {visibleItems.map((item, index) => (
              <div
                key={`${visibleRange.startIndex + index}`}
                style={{ height: itemHeight }}
                className="flex items-center"
              >
                {renderItem(item, visibleRange.startIndex + index)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {pagination?.enabled && (
        <Pagination
          currentPage={paginatedResult.pagination.currentPage}
          totalPages={paginatedResult.pagination.totalPages}
          onPageChange={handlePaginationChange}
          canGoPrevious={paginatedResult.pagination.canGoPrevious}
          canGoNext={paginatedResult.pagination.canGoNext}
          className="justify-center"
        />
      )}
    </div>
  );
}

// Create the memoized component with proper typing
const VirtualizedList = memo(VirtualizedListComponent) as typeof VirtualizedListComponent;

// Set displayName on the memoized component
(VirtualizedList as any).displayName = 'VirtualizedList';

export { VirtualizedList };
