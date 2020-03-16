/* eslint-disable global-require, @typescript-eslint/camelcase, no-console */
const clearConsole = require("react-dev-utils/clearConsole");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const StartServerPlugin = require("start-server-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const WebpackMessages = require("webpack-messages");
const NodeExternals = require("webpack-node-externals");

const babelOptions = require("../babel.config.js");

const isProd = process.env.NODE_ENV === "production";

const nodeArgs = ["-r", "source-map-support/register"];

if (process.env.INSPECT_BRK) {
  nodeArgs.push(process.env.INSPECT_BRK);
} else if (process.env.INSPECT) {
  nodeArgs.push(process.env.INSPECT);
}

module.exports = {
  watch: !isProd,
  bail: isProd,
  name: "server",
  devtool: "source-map",
  mode: isProd ? "production" : "development",
  performance: false,
  stats: "none",
  watchOptions: {
    ignored: [/node_modules/, /dist/]
  },
  target: "node",
  node: {
    __console: false,
    __dirname: false,
    __filename: false
  },
  externals: [
    NodeExternals({
      whitelist: [...(isProd ? [] : ["webpack/hot/poll?300"])]
    })
  ],
  entry: [...(isProd ? [] : ["webpack/hot/poll?300"]), "reflect-metadata", path.resolve("src", "index.ts")],
  output: {
    path: path.resolve("dist"),
    publicPath: "/static/",
    libraryTarget: "commonjs2",
    filename: "index.js",
    pathinfo: true,
    futureEmitAssets: isProd,
    devtoolModuleFilenameTemplate: isProd
      ? info => path.resolve(path.resolve("src"), info.absoluteResourcePath).replace(/\\/g, "/")
      : info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  optimization: {
    removeAvailableModules: isProd,
    removeEmptyChunks: isProd,
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
        extractComments: false,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 8,
            comments: false
          },
          parse: {
            ecma: 8
          },
          compress: {
            comparisons: true,
            inline: 2
          }
        }
      })
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.tsx?$/,
        use: {
          loader: "eslint-loader",
          options: {
            formatter: eslintFormatter
          }
        },
        enforce: "pre"
      },
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  babelrc: false,
                  configFile: false,
                  cacheDirectory: true,
                  cacheCompression: !isProd,
                  compact: !isProd,
                  ...babelOptions
                }
              },
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: !isProd,
                  configFile: path.resolve("tsconfig.json")
                }
              }
            ]
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "~": path.resolve("src"),
      "webpack/hot/poll": require.resolve("webpack/hot/poll")
    },
    extensions: [".js", ".ts", ".json"]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      BASE_DIR: path.resolve(".")
    }),
    ...(isProd
      ? [
          new CleanWebpackPlugin(),
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
          })
        ]
      : [
          new WebpackMessages({
            name: "Server",
            logger: str => {
              clearConsole();
              console.log(str);
              console.log("\nApplication Logs:\n");
            }
          }),
          new WatchMissingNodeModulesPlugin(path.resolve("node_modules")),
          new ModuleNotFoundPlugin(path.resolve("src")),
          new webpack.HotModuleReplacementPlugin({ quiet: true }),
          new StartServerPlugin({
            name: "index.js",
            keyboard: !isProd,
            nodeArgs
          })
        ])
  ]
};
