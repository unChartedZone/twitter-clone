module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        'main-content': '1fr 2fr 1.5fr',
      },
    },
  },
  variants: {},
  plugins: [],
};
