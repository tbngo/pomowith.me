const { violet, blackA, mauve, green } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['circular', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['source code pro', 'Menlo', 'monospace'],
      },
      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        contentShow: {
          '0%': { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          '100%': { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        }
      },
      animation: {
        "overlayShow": "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "contentShow": "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
}
