const { default: getWebpackConfig } = require("next/dist/build/webpack-config");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const path = require("path");

module.exports = ({ config, mode }) => {
  if (!!process.env.PUBLIC_PATH) {
    config.output.publicPath = process.env.PUBLIC_PATH
  }
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [require.resolve("babel-preset-react-app")]
    }
  });

  config.resolve.extensions.push(".ts", ".tsx");

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      async: false,
      checkSyntacticErrors: true,
      formatter: require("react-dev-utils/typescriptFormatter")
    })
  );

  return config;
};
