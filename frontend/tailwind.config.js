/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f5',
          100: '#d4f0e3',
          200: '#a8e1c8',
          300: '#6bceac',
          400: '#38b78f',
          500: '#0F9D58',
          600: '#0B7A3E',
          700: '#064e2a',
          800: '#043d22',
          900: '#022d1a',
        },
        secondary: {
          50: '#f5f7f6',
          100: '#eaf3ec',
          200: '#d5e7d9',
          300: '#b0d4b2',
          400: '#7fb88c',
          500: '#5a9d66',
          600: '#0F9D58',
          700: '#0B7A3E',
          800: '#064e2a',
          900: '#022d1a',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1f2937',
            a: {
              color: '#0B7A3E',
              '&:hover': {
                color: '#0F9D58',
              },
            },
          },
        },
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '40px',
        '2xl': '48px',
        '3xl': '56px',
        '4xl': '64px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '10px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.08)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.08)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.08)',
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['28px', '36px'],
        '4xl': ['32px', '40px'],
        '5xl': ['42px', '50px'],
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
