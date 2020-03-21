/* eslint-disable global-require, @typescript-eslint/camelcase */
const eslintFormatter = require("react-dev-utils/eslintFormatter");

const LodashPlugin = require("lodash-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const babelOptions = require("../babel.config");
const envs = require("./envs");

const isProd = process.env.NODE_ENV === "production";

module.exports = (isServer = false) => ({
  bail: isProd,
  name: isServer ? "Server" : "Client",
  devtool: "source-map",
  mode: isProd ? "production" : "development",
  performance: false,
  watchOptions: {
    ignored: [/node_modules/, /dist/]
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
          safari10: !isServer,
          keep_classnames: isServer,
          keep_fnames: isServer,
          output: {
            ecma: isServer ? 8 : 5,
            comments: false
          },
          parse: {
            ecma: 8
          },
          compress: {
            comparisons: true,
            inline: 2
          },
          mangle: !isServer
            ? {
                safari10: true
              }
            : null
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
            cache: true,
            formatter: eslintFormatter
          }
        },
        enforce: "pre"
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 10 * 1024
                }
              },
              "image-webpack-loader"
            ]
          },
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: "graphql-tag/loader"
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: "svg-url-loader",
                options: {
                  limit: 10 * 1024,
                  noquotes: true
                }
              },
              "image-webpack-loader"
            ]
          },
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
                  ...babelOptions(isServer)
                }
              },
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: !isProd,
                  configFile: path.resolve(`tsconfig.json`)
                }
              }
            ]
          },
          {
            exclude: [/\.(js|mjs|ts|tsx|scss|html|json)$/],
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "assets/[name].[contenthash:8].[ext]",
                  emitFile: !isServer
                }
              },
              "image-webpack-loader"
            ]
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "lodash-es": "lodash",
      "webpack/hot/poll": require.resolve("webpack/hot/poll")
    },
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json", ".scss", ".gql", ".graphql"]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      URL: `${envs.PROTOCOL}://${envs.HOST}:${envs.PORT}`,
      PORT: envs.PORT,
      HOST: envs.HOST,
      TARGET: isServer ? "server" : "web",
      PUBLIC_PATH: "/static/",
      PUBLIC_URL: "/static",
      STATIC_FOLDER: path.resolve("dist", "static"),
      MANIFEST: path.resolve("dist", "static", "manifest.json"),
      BASE_DIR: path.resolve("."),
      PROTOCOL: envs.PROTOCOL
    }),
    new LodashPlugin()
  ]
});
