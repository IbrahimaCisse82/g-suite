
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  loadingText?: string;
}

export const LoadingButton = ({ 
  loading = false, 
  loadingText = 'Chargement...', 
  children, 
  disabled,
  ...props 
}: LoadingButtonProps) => {
  return (
    <Button 
      disabled={loading || disabled} 
      className="transition-all duration-200 hover:scale-105"
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? loadingText : children}
    </Button>
  );
};
