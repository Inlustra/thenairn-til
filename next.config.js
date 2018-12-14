const withPlugins = require("next-compose-plugins");

const withTypescript = require("@zeit/next-typescript");

const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withBundleAnalyzerConfig = {
  analyzeServer: true,
  analyzeBrowser: true,
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../bundles/server.html"
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html"
    }
  }
};

const withImages = require("next-images");
const withImagesConfig = {};

module.exports = withPlugins([
  [withImages, withImagesConfig],
  [withBundleAnalyzer, withBundleAnalyzerConfig],
  [withTypescript]
]);
