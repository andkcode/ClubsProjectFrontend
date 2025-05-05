module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
    "./node_modules/shadcn-vue/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {      
      colors: {
      'warning': 'hsl(var(--warning))',
      'warning-foreground': 'hsl(var(--warning-foreground))',
    },},
  },
  plugins: [],
};
