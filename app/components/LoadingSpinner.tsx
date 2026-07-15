import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  className = ''
}: LoadingSpinnerProps) {
  
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-primary border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
}

// Skeleton loading state wrappers
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-card border border-border/60 rounded-xl p-5 animate-pulse ${className}`}>
      <div className="bg-muted rounded-lg aspect-square w-full mb-4" />
      <div className="h-4 bg-muted rounded w-2/3 mb-3" />
      <div className="h-3 bg-muted rounded w-1/2 mb-5" />
      <div className="flex items-center justify-between">
        <div className="h-6 bg-muted rounded w-1/4" />
        <div className="h-9 bg-muted rounded-full w-1/3" />
      </div>
    </div>
  );
}
