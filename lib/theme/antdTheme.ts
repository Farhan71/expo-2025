import type { ThemeConfig } from 'antd';

export const lightThemeTokens: ThemeConfig['token'] = {
  colorPrimary: '#2563eb', // Blue
  colorSuccess: '#16a34a', // Green
  colorWarning: '#ea580c', // Orange
  colorError: '#dc2626', // Red
  colorBgBase: '#ffffff',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#f8fafc',
  colorBgLayout: '#f1f5f9',
  colorBorder: '#e2e8f0',
  colorBorderSecondary: '#f1f5f9',
  colorText: '#0f172a',
  colorTextSecondary: '#475569',
  colorTextTertiary: '#64748b',
  colorTextQuaternary: '#94a3b8',
  borderRadius: 8,
  borderRadiusLG: 12,
  borderRadiusSM: 4,
  fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
  fontSize: 14,
  fontSizeLG: 16,
  fontSizeXL: 20,
  lineHeight: 1.5714285714285714,
  controlHeight: 40,
  controlHeightLG: 48,
  controlHeightSM: 32,
};

export const darkThemeTokens: ThemeConfig['token'] = {
  colorPrimary: '#3b82f6', // Slightly lighter blue for dark mode
  colorSuccess: '#22c55e', // Lighter green
  colorWarning: '#f97316', // Lighter orange
  colorError: '#ef4444', // Lighter red
  colorBgBase: '#0f172a',
  colorBgContainer: '#1e293b',
  colorBgElevated: '#334155',
  colorBgLayout: '#020617',
  colorBorder: '#475569',
  colorBorderSecondary: '#334155',
  colorText: '#f8fafc',
  colorTextSecondary: '#cbd5e1',
  colorTextTertiary: '#94a3b8',
  colorTextQuaternary: '#64748b',
  borderRadius: 8,
  borderRadiusLG: 12,
  borderRadiusSM: 4,
  fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
  fontSize: 14,
  fontSizeLG: 16,
  fontSizeXL: 20,
  lineHeight: 1.5714285714285714,
  controlHeight: 40,
  controlHeightLG: 48,
  controlHeightSM: 32,
};

export const lightTheme: ThemeConfig = {
  token: lightThemeTokens,
  components: {
    Button: {
      primaryShadow: '0 2px 0 rgba(5, 145, 255, 0.1)',
      defaultShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',
    },
    Card: {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      boxShadowTertiary:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    Layout: {
      headerBg: '#ffffff',
      footerBg: '#f8fafc',
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: darkThemeTokens,
  components: {
    Button: {
      primaryShadow: '0 2px 0 rgba(59, 130, 246, 0.15)',
      defaultShadow: '0 2px 0 rgba(255, 255, 255, 0.02)',
    },
    Card: {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      boxShadowTertiary:
        '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    Layout: {
      headerBg: '#1e293b',
      footerBg: '#020617',
    },
  },
};
