const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const LodashPlugin = require("lodash-webpack-plugin");
const path = require("path");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");

const measure = process.argv.some((arg) => arg === "--measure");

const smp = new SpeedMeasureWebpackPlugin({ disable: !measure });

process.env.RAZZLE_LOADABLE_MANIFEST = path.resolve("build", "loadable-stats.json");

module.exports = {
  options: { verbose: false, enableReactRefresh: true, disableWebpackbar: true },
  modifyPaths({ paths }) {
    paths.appClientIndexJs = path.resolve("src", "client", "index.tsx");
    paths.appServerIndexJs = path.resolve("src", "server", "index.ts");

    return paths;
  },
  modifyWebpackOptions({ options: { webpackOptions } }) {
    webpackOptions.fileLoaderExclude.push(/\.graphql$/);

    return webpackOptions;
  },
  modifyWebpackConfig({ webpackConfig, env: { target, dev } }) {
    let config = webpackConfig;

    config.resolve.alias["@"] = path.resolve("src");
    config.resolve.alias["lodash-es"] = "lodash";

    config.plugins.unshift(new LodashPlugin());

    if (target === "web") {
      const filename = path.resolve("build");

      config.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        })
      );

      if (!dev) {
        config.plugins.push(new CompressionWebpackPlugin({ exclude: [/\.txt$/i, /\.map$/i] }));
      }
    }

    return smp.wrap(config);
  },
  modifyJestConfig({ jestConfig }) {
    jestConfig = {
      ...jestConfig,
      transform: {
        ...jestConfig.transform,
        "\\.graphql$": "graphql-let/jestTransformer",
      },
      moduleNameMapper: {
        ...jestConfig.moduleNameMapper,
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      coverageDirectory: "<rootDir>/coverage",
    };

    return jestConfig;
  },
};
