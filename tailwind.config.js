export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}',
    './node_modules/shadcn-vue/**/*.{vue,js,ts}',
    './src/components/**/*.{vue,js,ts}',
    './src/styles/**/*.{css,scss}'       
  ],
  theme: {
    extend: {
      colors: {
        warning: 'hsl(var(--warning))',
        'warning-foreground': 'hsl(var(--warning-foreground))',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('tailwindcss-animate'),
  ],
};
