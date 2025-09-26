import { cn } from '@/lib/utils/cn';
import React from 'react';

interface UiSectionProps {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function UiSection({
  className,
  containerClassName,
  children,
}: UiSectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div
        className={cn(
          'container mx-auto px-4 sm:px-6 lg:px-8',
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface UiSectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function UiSectionHeader({
  title,
  subtitle,
  description,
  centered = true,
  className,
}: UiSectionHeaderProps) {
  return (
    <div className={cn('mb-12 md:mb-16', centered && 'text-center', className)}>
      {subtitle && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          {subtitle}
        </p>
      )}
      <h2 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-3xl text-lg text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
