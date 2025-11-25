/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#2563eb',
            hover: '#1d4ed8',
            background: '#dbeafe',
          },
          neutral: {
            background: '#f9fafb',
            border: '#e5e7eb',
            text: '#374151',
          },
          danger: '#dc2626',
          success: '#10b981',
        },
        boxShadow: {
          card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
        },
        fontSize: {
          small: '0.875rem',
          base: '1rem',
          h4: '1.125rem',
          h3: '1.25rem',
          h2: '1.5rem',
          h1: '2rem',
        },
      },
    },
    plugins: [],
  }