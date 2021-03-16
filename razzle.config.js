const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const LodashPlugin = require("lodash-webpack-plugin");
const path = require("path");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");

const measure = process.argv.some((arg) => arg === "--measure");

const smp = new SpeedMeasureWebpackPlugin({ disable: !measure });

process.env.RAZZLE_LOADABLE_MANIFEST = path.resolve("build", "static", "loadable-stats.json");

module.exports = {
  options: { verbose: true },
  plugins: [
    {
      name: "typescript",
      options: {
        useBabel: true,
      },
    },
  ],
  modifyPaths({ paths }) {
    paths.appClientIndexJs = path.resolve("src", "client", "index.tsx");
    paths.appServerIndexJs = path.resolve("src", "server", "index.ts");

    return paths;
  },
  modifyWebpackOptions({ options: { webpackOptions }, env: { target } }) {
    webpackOptions.fileLoaderExclude.push(/\.graphql$/);

    if (target === "node") {
      webpackOptions.terserPluginOptions = {
        terserOptions: {
          mangle: false,
          compress: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
        sourceMap: true,
        parallel: true,
      };
    }

    return webpackOptions;
  },
  modifyWebpackConfig({ webpackConfig, env: { target, dev } }) {
    const config = webpackConfig;

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
    }

    const tsRule = config.module.rules.findIndex((rule) => {
      if (Array.isArray(rule.use)) {
        return rule.use.some((u) => u.loader.includes("ts-loader"));
      }

      return false;
    });

    const ts = config.module.rules[tsRule];

    // add graphql tag loader
    config.module.rules.unshift({
      test: /\.graphql$/,
      use: [...ts.use, require.resolve("graphql-let/loader")],
    });

    return smp.wrap(config);
  },
};
