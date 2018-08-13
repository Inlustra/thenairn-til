const withPlugins = require('next-compose-plugins');

const withCss = require('@zeit/next-css');
const withCssConfig = {};

const withSass = require('@zeit/next-sass');
const withSassConfig = {
  cssModules: false,
  sassLoaderOptions: {
    includePaths: ['node_modules', 'styles']
  }
};

const withImages = require('next-images');
const withImagesConfig = {};

const withFonts = require('next-fonts');
const withFontsConfig = {};

module.exports = withPlugins([
  [withCss, withCssConfig],
  [withSass, withSassConfig],
  [withImages, withImagesConfig],
  [withFonts, withFontsConfig]
]);
