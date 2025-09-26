// Global type definitions
export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_PASSWORD: string;
      NEXT_PUBLIC_SITE_URL: string;
      EMAIL_FROM?: string;
      EMAIL_TO?: string;
      RESEND_API_KEY?: string;
      DATABASE_URL?: string;
    }
  }
}

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form state types
export interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  message?: string;
  success?: boolean;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// SEO types
export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  bg: string;
  'bg-secondary': string;
  'text-primary': string;
  'text-secondary': string;
  border: string;
  primary: string;
  'primary-hover': string;
  success: string;
  warning: string;
  error: string;
}