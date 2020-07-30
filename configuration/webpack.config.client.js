const LoadablePlugin = require("@loadable/webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const StylelintWebpackPlugin = require("stylelint-webpack-plugin");
const merge = require("webpack-merge");

const envs = require("./envs");
const baseConfig = require("./webpack.config.base");

const isProd = process.env.NODE_ENV === "production";

module.exports = (devPort = 3001) =>
  merge(baseConfig(false), {
    name: "client",
    target: "web",
    entry: [path.resolve("src", "client", "index.tsx")],
    optimization: {
      splitChunks: isProd
        ? {
            chunks: "all",
            cacheGroups: {
              styles: {
                name: "style",
                chunks: "all",
                test: /\.(s?css|sass)$/,
                enforce: true, // force css in new chunks (ignores all other options)
              },
            },
          }
        : false,
      moduleIds: isProd ? "hashed" : false,
      runtimeChunk: {
        name: "runtime",
      },
    },
    output: {
      publicPath: isProd ? "/static/" : `${envs.PROTOCOL}://${envs.HOST}:${devPort}/static/`,
      path: path.resolve("dist", "static"),
      libraryTarget: "var",
      filename: isProd ? `js/[name].[contenthash:8].js` : "index.js",
      chunkFilename: isProd ? `js/[name].[contenthash:8].js` : "[name].chunk.js",
      futureEmitAssets: isProd,
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
        ignored: ["node_modules/**", "src/**/*.d.ts", "dist/**", "src/server/schema.gql"],
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
      child_process: "empty",
    },
    plugins: [
      isProd &&
        new CompressionPlugin({
          exclude: /(\.map|\.LICENSE|\.json)/,
          cache: true,
          minRatio: Number.MAX_SAFE_INTEGER,
        }),
      !isProd && new ReactRefreshWebpackPlugin({ overlay: { sockPort: devPort } }),
      new StylelintWebpackPlugin(),
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
    ].filter(Boolean),
  });
