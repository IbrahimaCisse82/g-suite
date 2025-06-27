
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreHorizontal 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  className?: string;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export const Pagination = memo<PaginationProps>(({
  currentPage,
  totalPages,
  onPageChange,
  canGoPrevious,
  canGoNext,
  className,
  showFirstLast = true,
  maxVisiblePages = 5
}) => {
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex items-center justify-center space-x-1', className)}>
      {/* First page */}
      {showFirstLast && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={!canGoPrevious}
          className="flex items-center gap-1"
        >
          <ChevronsLeft className="h-4 w-4" />
          Premier
        </Button>
      )}

      {/* Previous page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page 1 if not visible */}
      {showStartEllipsis && (
        <>
          <Button
            variant={currentPage === 1 ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(1)}
          >
            1
          </Button>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </>
      )}

      {/* Visible page numbers */}
      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          className={cn(
            currentPage === page && "bg-green-600 hover:bg-green-700 text-white"
          )}
        >
          {page}
        </Button>
      ))}

      {/* Last page if not visible */}
      {showEndEllipsis && (
        <>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
          <Button
            variant={currentPage === totalPages ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last page */}
      {showFirstLast && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoNext}
          className="flex items-center gap-1"
        >
          Dernier
          <ChevronsRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
});

Pagination.displayName = 'Pagination';
