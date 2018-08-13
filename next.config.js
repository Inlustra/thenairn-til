const withPlugins = require('next-compose-plugins');

const withSass = require("@zeit/next-sass");
const withSassConfig = {
    cssModules: false,
    sassLoaderOptions: {
      includePaths: ["node_modules", "styles"]
    }
  }

const withImages = require("next-images")
const withImagesConfig = {}

module.exports = withPlugins([
    [withSass, withSassConfig], [withImages, withImagesConfig]
]);
