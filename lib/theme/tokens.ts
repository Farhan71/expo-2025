// CSS variables mapping theme tokens for both light and dark modes
export const cssVariables = {
  light: {
    '--color-bg-rgb': '255, 255, 255',
    '--color-bg-secondary-rgb': '248, 250, 252',
    '--color-text-primary-rgb': '15, 23, 42',
    '--color-text-secondary-rgb': '71, 85, 105',
    '--color-border-rgb': '226, 232, 240',
    '--color-primary-rgb': '37, 99, 235',
    '--color-primary-hover-rgb': '29, 78, 216',
    '--color-success-rgb': '22, 163, 74',
    '--color-warning-rgb': '234, 88, 12',
    '--color-error-rgb': '220, 38, 38',
  },
  dark: {
    '--color-bg-rgb': '15, 23, 42',
    '--color-bg-secondary-rgb': '30, 41, 59',
    '--color-text-primary-rgb': '248, 250, 252',
    '--color-text-secondary-rgb': '203, 213, 225',
    '--color-border-rgb': '71, 85, 105',
    '--color-primary-rgb': '59, 130, 246',
    '--color-primary-hover-rgb': '37, 99, 235',
    '--color-success-rgb': '34, 197, 94',
    '--color-warning-rgb': '249, 115, 22',
    '--color-error-rgb': '239, 68, 68',
  },
} as const;

export type ThemeMode = 'light' | 'dark' | 'system';
