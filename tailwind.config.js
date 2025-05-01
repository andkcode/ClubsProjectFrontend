module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
    "./node_modules/shadcn-vue/**/*.{vue,js,ts}", // 👈 include Shadcn components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
