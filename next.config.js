const withPlugins = require("next-compose-plugins");

const withTypescript = require("@zeit/next-typescript");

const withImages = require("next-images");
const withImagesConfig = {};

module.exports = withPlugins([
  [withImages, withImagesConfig],
  [withTypescript]
]);
