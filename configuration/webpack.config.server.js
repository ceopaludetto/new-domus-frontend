const path = require("path");
const StartServerWebpackPlugin = require("start-server-webpack-plugin");
const webpack = require("webpack");
const merge = require("webpack-merge");
const NodeExternals = require("webpack-node-externals");

const envs = require("./envs");
const baseConfig = require("./webpack.config.base");

const isProd = process.env.NODE_ENV === "production";

const nodeArgs = ["-r", "source-map-support/register"];

if (process.env.INSPECT_BRK) {
  nodeArgs.push(process.env.INSPECT_BRK);
} else if (process.env.INSPECT) {
  nodeArgs.push(process.env.INSPECT);
}

module.exports = (devPort = 3001) =>
  merge(baseConfig(true), {
    name: "server",
    watch: !isProd,
    target: "node",
    node: {
      __console: false,
      __dirname: false,
      __filename: false,
    },
    externals: [
      NodeExternals({
        whitelist: [!isProd && "webpack/hot/poll?300", /\.(scss|sass|gql|graphql)$/].filter(Boolean),
      }),
    ],
    entry: [
      !isProd && "razzle-dev-utils/prettyNodeErrors",
      !isProd && "webpack/hot/poll?300",
      "reflect-metadata",
      path.resolve("src", "server", "index.ts"),
    ].filter(Boolean),
    output: {
      path: path.resolve("dist"),
      publicPath: isProd ? "/static/" : `${envs.PROTOCOL}://${envs.HOST}:${devPort}/static/`,
      libraryTarget: "commonjs2",
      filename: "index.js",
      futureEmitAssets: isProd,
    },
    plugins: [
      !isProd &&
        new StartServerWebpackPlugin({
          name: "index.js",
          keyboard: !isProd,
          nodeArgs,
        }),
      !isProd && new webpack.HotModuleReplacementPlugin({ quiet: true }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ].filter(Boolean),
  });
