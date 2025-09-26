import { cn } from '@/lib/utils/cn';
import React from 'react';

interface UiTagProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
  children: React.ReactNode;
}

export function UiTag({
  variant = 'primary',
  size = 'md',
  className,
  children,
}: UiTagProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';

  const variantClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-bg-secondary text-text-secondary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface UiInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export function UiInput({
  label,
  error,
  helperText,
  required,
  className,
  ...props
}: UiInputProps) {
  const inputId =
    props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-lg border border-border px-3 py-2 transition-colors',
          'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary',
          'placeholder:text-text-secondary',
          error && 'border-error focus:ring-error',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-text-secondary">{helperText}</p>
      )}
    </div>
  );
}

interface UiTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export function UiTextArea({
  label,
  error,
  helperText,
  required,
  className,
  ...props
}: UiTextAreaProps) {
  const textareaId =
    props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'resize-vertical w-full rounded-lg border border-border px-3 py-2 transition-colors',
          'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary',
          'placeholder:text-text-secondary',
          error && 'border-error focus:ring-error',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-text-secondary">{helperText}</p>
      )}
    </div>
  );
}

interface UiFormFieldsProps {
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function UiFormFields({
  label,
  error,
  description,
  required,
  children,
  className,
}: UiFormFieldsProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-sm text-error">{error}</p>}
      {description && !error && (
        <p className="text-sm text-text-secondary">{description}</p>
      )}
    </div>
  );
}
