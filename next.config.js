const withPlugins = require('next-compose-plugins');

const withSass = require('@zeit/next-sass');
const withSassConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
};

const withImages = require('next-images');
const withImagesConfig = {};


module.exports = withPlugins([
  [withSass, withSassConfig],
  [withImages, withImagesConfig],
]);
