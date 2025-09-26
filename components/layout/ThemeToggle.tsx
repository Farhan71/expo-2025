'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { UiButton } from '@/components/ui/UiButton';
import { useEffect, useState } from 'react';

// Icons as simple SVG components
const SunIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by showing a placeholder until mounted
  if (!mounted) {
    return (
      <UiButton
        variant="subtle"
        size="sm"
        aria-label="Toggle theme"
        className="p-2"
        disabled
      >
        <div className="h-4 w-4" />
      </UiButton>
    );
  }

  return (
    <UiButton
      variant="subtle"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      className="p-2"
    >
      {resolvedTheme === 'light' ? <MoonIcon /> : <SunIcon />}
    </UiButton>
  );
}
