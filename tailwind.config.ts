import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-app': 'var(--bg-app)',
        'bg-card-white': 'var(--bg-card-white)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-quaternary': 'var(--text-quaternary)',
        'accent-blue': 'var(--accent-blue)',
        divider: 'var(--divider)',
      },
      fontFamily: {
        sf: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '14px',
        'card-content': '18px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 2px 6px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.10)',
        pill: '0 1px 2px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      maxWidth: {
        wallet: '480px',
      },
    },
  },
  plugins: [],
} satisfies Config;
