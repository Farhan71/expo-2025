import { cn } from '@/lib/utils/cn';
import React from 'react';

interface UiCardProps {
  variant?: 'elevated' | 'outline' | 'subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function UiCard({
  variant = 'elevated',
  padding = 'md',
  className,
  children,
}: UiCardProps) {
  const baseClasses = 'rounded-lg transition-all duration-200';

  const variantClasses = {
    elevated: 'bg-bg shadow-md hover:shadow-lg border border-border/50',
    outline: 'bg-bg border border-border hover:border-primary/50',
    subtle: 'bg-bg-secondary border border-transparent hover:border-border',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
