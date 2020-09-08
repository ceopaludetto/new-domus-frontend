/* eslint-disable global-require */
const LoadablePlugin = require("@loadable/webpack-plugin");
const LodashPlugin = require("lodash-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

process.env.RAZZLE_LOADABLE_MANIFEST = path.resolve("build", "public", "loadable-stats.json");

const options = require("./configuration/scss.options");

module.exports = {
  experimental: {
    newBabel: true,
    newExternals: true,
    newSplitChunks: true,
    newContentHash: true,
    newMainFields: true,
  },
  plugins: [
    {
      name: "typescript",
      options: {
        useBabel: true,
        forkTsChecker: {
          tslint: false,
        },
      },
    },
    {
      name: "scss",
      options,
    },
  ],
  modify: (config, { target, dev }) => {
    const last = config.entry.length - 1;

    if (target === "node" && !dev) {
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              mangle: false,
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            sourceMap: true,
          }),
        ],
      };
    }

    if (target === "web") {
      config.entry.client = path.resolve("src", "client", "index.tsx");
    }

    if (target === "node") {
      // add correct index path
      config.entry[last] = path.resolve("src", "server", "index.ts");
    }

    config.resolve.alias["@"] = path.resolve("src");
    config.resolve.alias["lodash-es"] = "lodash";

    // exclude .graphql from file-loader
    config.module.rules.find((x) => x.exclude).exclude.push(/\.(gql|graphql)$/);

    // add lodash plugin
    config.plugins.unshift(new LodashPlugin());

    if (target === "web") {
      if (dev) {
        const scss = config.module.rules[config.module.rules.length - 1];

        const index = scss.use.findIndex((x) => x.loader === require.resolve("css-loader"));

        config.module.rules[config.module.rules.length - 1].use = [
          ...scss.use.slice(0, index),
          {
            loader: require.resolve("@teamsupercell/typings-for-css-modules-loader"),
            options: {
              disableLocalsExport: true,
            },
          },
          ...scss.use.slice(index),
        ];
      }

      config.plugins.unshift(new LoadablePlugin({ writeToDisk: true }));
    }

    // add graphql tag loader
    config.module.rules.unshift({
      test: /\.(gql|graphql)$/,
      use: [require.resolve("graphql-tag/loader")],
    });

    return config;
  },
};
