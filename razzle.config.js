const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const LodashPlugin = require("lodash-webpack-plugin");
const path = require("path");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");

const measure = process.argv.some((arg) => arg === "--measure");

const smp = new SpeedMeasureWebpackPlugin({ disable: !measure });

module.exports = {
  options: { verbose: false, enableReactRefresh: false },
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

    const ts = config.module.rules.find((rule) => {
      if (Array.isArray(rule.use)) {
        return rule.use.some((u) => u.loader.includes("babel-loader"));
      }

      return false;
    });

    // add graphql tag loader
    config.module.rules.unshift({
      test: /\.graphql$/,
      use: [...ts.use, require.resolve("graphql-let/loader")],
    });

    return smp.wrap(config);
  },
};
