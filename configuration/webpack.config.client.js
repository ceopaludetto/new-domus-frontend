const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");

const LoadablePlugin = require("@loadable/webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const envs = require("./envs");
const baseConfig = require("./webpack.config.base");

const isProd = process.env.NODE_ENV === "production";

module.exports = merge(baseConfig(false), {
  name: "client",
  target: "web",
  entry: [...(isProd ? [] : ["razzle-dev-utils/webpackHotDevClient"]), path.resolve("src", "client", "index.tsx")],
  optimization: {
    splitChunks: isProd
      ? {
          chunks: "all",
          cacheGroups: {
            styles: {
              name: "index",
              test: /\.scss$/,
              chunks: "all",
              enforce: true,
            },
          },
        }
      : undefined,
    moduleIds: isProd ? "hashed" : false,
    runtimeChunk: isProd
      ? {
          name: "runtime",
        }
      : false,
  },
  output: {
    pathinfo: true,
    publicPath: isProd ? "/static/" : `${envs.PROTOCOL}://${envs.HOST}:${envs.DEV_PORT}/static/`,
    path: path.resolve("dist", "static"),
    libraryTarget: "var",
    filename: isProd ? "js/[name].[contenthash:8].js" : "index.js",
    chunkFilename: isProd ? "js/[name].[contenthash:8].js" : "[name].chunk.js",
    futureEmitAssets: true,
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.resourcePath).replace(/\\/g, "/"),
  },
  devServer: {
    disableHostCheck: true,
    clientLogLevel: "none",
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    noInfo: true,
    overlay: false,
    publicPath: "/static/",
    host: envs.HOST,
    port: envs.DEV_PORT,
    quiet: true,
    watchOptions: {
      ignored: ["node_modules/**", "src/**/*.d.ts", "dist/**"],
    },
    before(app) {
      app.use(errorOverlayMiddleware());
    },
  },
  node: {
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    http2: "empty",
    net: "empty",
    tls: "empty",
    // eslint-disable-next-line @typescript-eslint/camelcase
    child_process: "empty",
  },
  plugins: [
    ...(isProd
      ? [
          new webpack.HashedModuleIdsPlugin(),
          new webpack.optimize.AggressiveMergingPlugin(),
          new CompressionPlugin({
            exclude: /(\.map|\.LICENSE|\.json)/,
            cache: true,
            minRatio: Number.MAX_SAFE_INTEGER,
          }),
        ]
      : [
          new webpack.HotModuleReplacementPlugin({
            multiStep: true,
            quiet: true,
          }),
        ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve("public"),
        to: path.resolve("dist", "static", "public"),
      },
    ]),
    new LoadablePlugin({
      filename: "manifest.json",
      writeToDisk: true,
    }),
  ],
});
