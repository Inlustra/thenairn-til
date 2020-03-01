const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules");

const withImages = require("next-images");
const withImagesConfig = {};
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = withPlugins([
  [
    withImages,
    withImagesConfig,
    [
      withTM,
      {
        transpileModules: ["react-syntax-highlighter"]
      }
    ]
  ],
  nextConfig => {
    return {
      ...nextConfig,
      webpack: (config, options) => {
        if (config.resolve.plugins) {
          config.resolve.plugins.push(new TsconfigPathsPlugin());
        } else {
          config.resolve.plugins = [new TsconfigPathsPlugin()];
        }

        return config;
      }
    };
  }
]);
