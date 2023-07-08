const { environment } = require('@rails/webpacker');
const tailwindcss = require('tailwindcss');

environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [tailwindcss],
    },
  },
});

module.exports = environment;
