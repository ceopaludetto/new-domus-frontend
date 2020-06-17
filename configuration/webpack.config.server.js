const path = require("path");
const StartServerPlugin = require("start-server-webpack-plugin");
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

module.exports = merge(baseConfig(true), {
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
      whitelist: [...(isProd ? [] : ["./hotPoll.js?300"]), /\.(scss|sass|gql|graphql)$/],
    }),
  ],
  entry: [
    ...(isProd ? [] : ["razzle-dev-utils/prettyNodeErrors", "./hotPoll.js?300"]),
    "reflect-metadata",
    path.resolve("src", "server", "index.ts"),
  ],
  output: {
    path: path.resolve("dist"),
    publicPath: isProd ? "/static/" : `${envs.PROTOCOL}://${envs.HOST}:${envs.DEV_PORT}/static/`,
    libraryTarget: "commonjs2",
    filename: "index.js",
    pathinfo: true,
    futureEmitAssets: isProd,
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.resourcePath).replace(/\\/g, "/"),
  },
  plugins: [
    ...(isProd
      ? []
      : [
          new webpack.HotModuleReplacementPlugin({ quiet: true }),
          new webpack.WatchIgnorePlugin([path.resolve("src", "server", "schema.gql")]),
          new StartServerPlugin({
            name: "index.js",
            keyboard: !isProd,
            nodeArgs,
          }),
        ]),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});
