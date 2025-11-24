/**
 * Configuración de Tailwind CSS para el Sistema Municipal
 * 
 * Este archivo contiene la configuración de Tailwind que corresponde
 * al Design System definido en Figma.
 * 
 * Copia este contenido a tu archivo tailwind.config.js cuando
 * implementes el frontend.
 */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores primarios
        primary: {
          DEFAULT: '#0066CC',
          hover: '#0052A3',
          background: '#E6F2FF',
        },
        // Colores de estado
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        // Colores neutros
        neutral: {
          text: '#6B7280',
          border: '#E5E7EB',
          background: '#F9FAFB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Tipografía del sistema
        'h1': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h4': ['18px', { lineHeight: '24px', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      spacing: {
        // Espaciados del sistema
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      boxShadow: {
        // Sombras del sistema
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'modal': '0 20px 25px rgba(0, 0, 0, 0.15)',
      },
      screens: {
        // Breakpoints
        'desktop': '1280px',
        'tablet': '768px',
        'mobile': '375px',
      },
    },
  },
  plugins: [],
}

/**
 * Clases de utilidad personalizadas sugeridas:
 * 
 * Botones:
 * - btn-primary: bg-primary hover:bg-primary-hover text-white
 * - btn-secondary: bg-transparent border border-neutral-border text-neutral-text
 * - btn-danger: bg-danger hover:bg-red-600 text-white
 * - btn-success: bg-success hover:bg-green-600 text-white
 * 
 * Inputs:
 * - input-base: border border-neutral-border rounded-sm px-md py-sm
 * - input-focus: focus:border-primary focus:ring-2 focus:ring-primary-background
 * - input-error: border-danger
 * 
 * Cards:
 * - card-base: bg-white border border-neutral-border rounded-md p-lg shadow-card
 * - card-kpi: card-base border-t-4 (con color específico)
 * 
 * Badges:
 * - badge-success: bg-green-100 text-green-800
 * - badge-warning: bg-yellow-100 text-yellow-800
 * - badge-danger: bg-red-100 text-red-800
 * - badge-info: bg-blue-100 text-blue-800
 */



