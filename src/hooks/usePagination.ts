
import { useState, useMemo, useCallback } from 'react';

interface PaginationOptions {
  initialPage?: number;
  pageSize?: number;
  totalItems: number;
}

export function usePagination<T>({
  initialPage = 1,
  pageSize = 10,
  totalItems
}: PaginationOptions) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * pageSize;
  }, [currentPage, pageSize]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + pageSize - 1, totalItems - 1);
  }, [startIndex, pageSize, totalItems]);

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPreviousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(totalPages);
  }, [totalPages, goToPage]);

  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;

  const paginationInfo = useMemo(() => ({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    startIndex,
    endIndex,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    canGoNext,
    canGoPrevious
  }), [
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    startIndex,
    endIndex,
    canGoNext,
    canGoPrevious
  ]);

  return {
    ...paginationInfo,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage
  };
}

export function usePaginatedData<T>(data: T[], paginationOptions: PaginationOptions) {
  const pagination = usePagination(paginationOptions);
  
  const paginatedData = useMemo(() => {
    return data.slice(pagination.startIndex, pagination.endIndex + 1);
  }, [data, pagination.startIndex, pagination.endIndex]);

  return {
    data: paginatedData,
    pagination
  };
}
