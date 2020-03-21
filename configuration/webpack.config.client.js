const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");

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
              enforce: true
            }
          }
        }
      : undefined,
    moduleIds: isProd ? "hashed" : false,
    runtimeChunk: isProd
      ? {
          name: "runtime"
        }
      : false
  },
  output: {
    pathinfo: true,
    publicPath: isProd ? "/static/" : `http://${envs.HOST}:${envs.DEV_PORT}/static/`,
    path: path.resolve("dist", "static"),
    libraryTarget: "var",
    filename: isProd ? "js/[name].[contenthash:8].js" : "index.js",
    chunkFilename: isProd ? "js/[name].[contenthash:8].js" : "[name].chunk.js",
    futureEmitAssets: true,
    devtoolModuleFilenameTemplate: isProd
      ? info => path.resolve(path.resolve("src"), info.absoluteResourcePath).replace(/\\/g, "/")
      : info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  devServer: {
    disableHostCheck: true,
    clientLogLevel: "none",
    compress: true,
    contentBase: path.resolve("public"),
    watchContentBase: true,
    injectClient: false,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    historyApiFallback: {
      disableDotRule: true
    },
    hot: true,
    noInfo: true,
    overlay: false,
    publicPath: "/static/",
    host: envs.HOST,
    port: envs.DEV_PORT,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    before(app, server) {
      app.use(evalSourceMapMiddleware(server));
      app.use(errorOverlayMiddleware());
    }
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
    child_process: "empty"
  },
  plugins: [
    ...(isProd
      ? [
          new webpack.HashedModuleIdsPlugin(),
          new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5
          }),
          new CompressionPlugin({
            exclude: /(\.map|\.LICENSE|\.json)/,
            cache: true,
            minRatio: Number.MAX_SAFE_INTEGER
          }),
          new CopyWebpackPlugin([
            {
              from: path.resolve("public"),
              to: path.resolve("dist", "static", "public")
            }
          ])
        ]
      : [
          new webpack.HotModuleReplacementPlugin({
            multiStep: true,
            quiet: true
          }),
          new WatchMissingNodeModulesPlugin(path.resolve("node_modules"))
        ]),
    new LoadablePlugin({
      filename: "manifest.json",
      writeToDisk: true
    }),
    new ModuleNotFoundPlugin(path.resolve("src"))
  ]
});
