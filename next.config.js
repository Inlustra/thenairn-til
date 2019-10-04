const withPlugins = require("next-compose-plugins");

const withImages = require("next-images");
const withImagesConfig = {};

module.exports = withPlugins([
  [withImages, withImagesConfig],
]);
