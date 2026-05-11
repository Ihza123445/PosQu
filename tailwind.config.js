import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Helvetica', 'Arial', ...defaultTheme.fontFamily.sans],
                display: ['Inter', 'Helvetica', 'Arial', ...defaultTheme.fontFamily.sans],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', ...defaultTheme.fontFamily.mono],
            },
            fontSize: {
                'display-xl': ['70px', { lineHeight: '1', fontWeight: '330' }],
                'display-lg': ['55px', { lineHeight: '1.16', fontWeight: '330' }],
                'display-md': ['48px', { lineHeight: '1.14', fontWeight: '330' }],
                'heading-xl': ['28px', { lineHeight: '1.28', fontWeight: '500', letterSpacing: '0.42px' }],
                'heading-lg': ['24px', { lineHeight: '1.14', fontWeight: '400', letterSpacing: '0.36px' }],
                'heading-md': ['20px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.3px' }],
                'heading-sm': ['18px', { lineHeight: '1.25', fontWeight: '500', letterSpacing: '0.72px' }],
                'body-lg': ['18px', { lineHeight: '1.56', fontWeight: '550' }],
                'body-md': ['16px', { lineHeight: '1.5', fontWeight: '420' }],
                'body-strong': ['16px', { lineHeight: '1.5', fontWeight: '550' }],
                'caption': ['14px', { lineHeight: '1.49', fontWeight: '500', letterSpacing: '0.28px' }],
                'micro': ['13px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '-0.13px' }],
                'eyebrow': ['12px', { lineHeight: '1.2', fontWeight: '400', letterSpacing: '0.72px' }],
            },
            colors: {
                shopify: {
                    ink: '#000000',
                    'on-primary': '#ffffff',
                    'on-dark': '#ffffff',
                    canvas: '#ffffff',
                    'canvas-soft': '#fbfbf5',
                    'canvas-dark': '#000000',
                    'surface-elevated': '#1e2c31',
                    'shade-30': '#d4d4d8',
                    'shade-40': '#a1a1aa',
                    'shade-50': '#71717a',
                    'shade-60': '#52525b',
                    'shade-70': '#3f3f46',
                    'hairline': '#e4e4e7',
                    'hairline-dark': '#1e2c31',
                    'aloe': '#c1fbd4',
                    'pistachio': '#d4f9e0',
                    'link-cool': '#9dabad',
                    'link-mint': '#99b3ad',
                },
            },
            borderRadius: {
                'xs': '4px',
                'sm': '5px',
                'md': '8px',
                'lg': '12px',
                'xl': '20px',
                'pill': '9999px',
            },
            spacing: {
                'xxs': '2px',
                'xs': '4px',
                'sm': '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '24px',
                'xxl': '32px',
                'huge': '64px',
            },
            boxShadow: {
                'shopify-1': '0 1px 2px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
                'shopify-2': '0 0 0 1px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.3), 0 5px 10px rgba(0,0,0,0.2)',
                'shopify-3': '0 8px 8px rgba(0,0,0,0.1), 0 4px 4px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.1)',
                'shopify-4': '0 25px 50px -12px rgba(0,0,0,0.25)',
                'card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
                'card-hover': '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
            },
        },
    },

    plugins: [forms],
};
