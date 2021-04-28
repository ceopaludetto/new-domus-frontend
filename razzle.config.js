const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const LodashPlugin = require("lodash-webpack-plugin");
const path = require("path");
const makeLoaderFinder = require("razzle-dev-utils/makeLoaderFinder");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");

const measure = process.argv.some((arg) => arg === "--measure");

const smp = new SpeedMeasureWebpackPlugin({ disable: !measure });

const findBabelLoader = makeLoaderFinder("babel-loader");

module.exports = {
  options: { verbose: false, enableReactRefresh: true, disableWebpackbar: true },
  modifyPaths({ paths }) {
    paths.appClientIndexJs = path.resolve("src", "client", "index.tsx");
    paths.appServerIndexJs = path.resolve("src", "server", "index.ts");

    return paths;
  },
  modifyWebpackOptions({ options: { webpackOptions }, env: { target } }) {
    webpackOptions.fileLoaderExclude.push(/\.graphql$/);

    return webpackOptions;
  },
  modifyWebpackConfig({ webpackConfig, env: { target, dev } }) {
    let config = webpackConfig;

    config.resolve.alias["@"] = path.resolve("src");
    config.resolve.alias["lodash-es"] = "lodash";

    config.plugins.unshift(new LodashPlugin());

    process.env.RAZZLE_LOADABLE_MANIFEST = dev
      ? path.resolve("build", "loadable-stats.json")
      : path.resolve("build", "public", "loadable-stats.json");

    if (target === "web") {
      const filename = path.resolve("build");

      config.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: !dev,
          writeToDisk: dev ? { filename } : undefined,
        })
      );

      if (!dev) {
        config.plugins.push(new CompressionWebpackPlugin({ exclude: [/\.txt$/i, /\.map$/i] }));
      }
    }

    const ts = config.module.rules.find(findBabelLoader);

    // add graphql tag loader
    config.module.rules.unshift({
      test: /\.graphql$/,
      use: [...ts.use, require.resolve("graphql-let/loader")],
    });

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
