const withPlugins = require("next-compose-plugins");
const withTM = require('next-transpile-modules');

const withImages = require("next-images");
const withImagesConfig = {};

module.exports = withPlugins([
  [withImages, withImagesConfig, [withTM, {
    transpileModules: ['react-syntax-highlighter']
  }]],
]);
