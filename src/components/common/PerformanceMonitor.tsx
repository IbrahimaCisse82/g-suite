
import React, { memo } from 'react';
import { useAppStore } from '@/stores/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, Zap } from 'lucide-react';

export const PerformanceMonitor = memo(() => {
  const { metrics, isEnabled } = useAppStore((state) => state.performance);

  if (!isEnabled || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getAverageTime = (times: number[]) => {
    if (times.length === 0) return 0;
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  };

  const getStatusColor = (avgTime: number) => {
    if (avgTime < 50) return 'green';
    if (avgTime < 100) return 'yellow';
    return 'red';
  };

  const sortedMetrics = Object.entries(metrics)
    .map(([operation, times]) => ({
      operation,
      times,
      average: getAverageTime(times),
      latest: times[times.length - 1] || 0
    }))
    .sort((a, b) => b.average - a.average);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Performance Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sortedMetrics.slice(0, 5).map(({ operation, average, latest }) => (
            <div key={operation} className="flex items-center justify-between text-xs">
              <span className="truncate flex-1 mr-2" title={operation}>
                {operation}
              </span>
              <div className="flex items-center gap-1">
                <Badge 
                  variant="outline" 
                  className={`px-1 py-0 text-xs ${
                    getStatusColor(average) === 'green' ? 'border-green-500 text-green-700' :
                    getStatusColor(average) === 'yellow' ? 'border-yellow-500 text-yellow-700' :
                    'border-red-500 text-red-700'
                  }`}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {average.toFixed(1)}ms
                </Badge>
                <Badge variant="secondary" className="px-1 py-0 text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  {latest.toFixed(1)}ms
                </Badge>
              </div>
            </div>
          ))}
          {sortedMetrics.length === 0 && (
            <p className="text-xs text-gray-500 text-center py-2">
              Aucune métrique disponible
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';
