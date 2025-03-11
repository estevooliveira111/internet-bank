/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-red': 'var(--red)',
        primary: 'var(--primary)',
        'main-gray': 'var(--gray)',
        'tx-primary': 'var(--text-primary)',
        'dark-blue': '#142249',
        'main-white': 'var(--white)',
        'gray-light': 'var(--gray-light)',
        'main-semibold': 'var(--semi-bold)',
        background: 'var(--background)',
        'gray-dark': '#777986',
        'main-green': 'var(--green)',
        'brand-bg': 'var(--brand-background)',
      },
      fontWeight: {
        light: 'var(--light)',
        regular: 'var(--regular)',
        semibold: 'var(--semiBold)',
        bold: 'var(--bold)',
      },
      screens: {
        laptop: '1024px',
        desktop: '1280px',
      },
      width: {
        table: 'calc(100vw - 64px)',
        'table-md': 'calc(100vw - 64px - 256px)',
      },
    },
  },
  plugins: [],
}
