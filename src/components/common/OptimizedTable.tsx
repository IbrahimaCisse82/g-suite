
import React, { useState, useMemo, useCallback, memo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { SmartLoader } from './SmartLoader';
import { usePagination } from '@/hooks/usePagination';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
}

interface OptimizedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  error?: Error | null;
  searchable?: boolean;
  filterable?: boolean;
  pageSize?: number;
  onRetry?: () => void;
  emptyMessage?: string;
  className?: string;
}

function OptimizedTableComponent<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  error = null,
  searchable = true,
  filterable = false,
  pageSize = 20,
  onRetry,
  emptyMessage = "Aucune donnée disponible",
  className
}: OptimizedTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter and search data
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Pagination
  const pagination = usePagination({
    totalItems: sortedData.length,
    pageSize,
    initialPage: 1
  });

  const paginatedData = useMemo(() => {
    const start = pagination.startIndex;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, pagination.startIndex, pageSize]);

  const handleSort = useCallback((column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  }, [sortColumn]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    pagination.goToFirstPage();
  }, [pagination]);

  if (isLoading) {
    return <SmartLoader isLoading={true} skeleton={true} rows={5} onRetry={onRetry} />;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and filters */}
      {(searchable || filterable) && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          
          {filterable && (
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <SmartLoader 
          isLoading={false} 
          error={error} 
          onRetry={onRetry}
          fallback={
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead 
                      key={String(column.key)}
                      style={{ width: column.width }}
                      className={column.sortable ? 'cursor-pointer hover:bg-gray-50' : ''}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="flex items-center justify-between">
                        {column.label}
                        {column.sortable && sortColumn === column.key && (
                          <span className="ml-2 text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                      {emptyMessage}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell key={String(column.key)}>
                          {column.render 
                            ? column.render(row[column.key], row, index)
                            : String(row[column.key] || '-')
                          }
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          }
        />
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={pagination.goToPreviousPage}
              disabled={!pagination.canGoPrevious}
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={pagination.goToNextPage}
              disabled={!pagination.canGoNext}
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>
              Page {pagination.currentPage} sur {pagination.totalPages}
            </span>
            <span>•</span>
            <span>
              {pagination.startIndex + 1}-{Math.min(pagination.endIndex + 1, pagination.totalItems)} sur {pagination.totalItems}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export const OptimizedTable = memo(OptimizedTableComponent) as <T extends Record<string, any>>(
  props: OptimizedTableProps<T>
) => JSX.Element;
