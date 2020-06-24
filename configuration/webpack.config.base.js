/* eslint-disable global-require, @typescript-eslint/camelcase */
const eslintFormatter = require("react-dev-utils/eslintFormatter");

const LodashPlugin = require("lodash-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const safePostCssParser = require("postcss-safe-parser");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const babelOptions = require("../babel.config");

const isProd = process.env.NODE_ENV === "production";

const isDebug = process.env.INSPECT_BRK || process.env.INSPECT || false;

function resolveDevTool() {
  if (isDebug || isProd) {
    return "source-map";
  }

  return "inline-source-map";
}

module.exports = (isServer = false) => ({
  bail: isProd,
  name: isServer ? "Server" : "Client",
  devtool: resolveDevTool(),
  mode: isProd ? "production" : "development",
  performance: false,
  watchOptions: {
    ignored: [/node_modules/, /dist/],
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
          module: true,
          output: {
            ecma: isServer ? 8 : 5,
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: {
            inline: false,
            annotation: true,
          },
        },
        cssProcessorPluginOptions: {
          preset: ["advanced", { discardComments: { removeAll: true } }],
        },
      }),
    ],
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
            formatter: eslintFormatter,
          },
        },
        enforce: "pre",
      },
      {
        oneOf: [
          {
            test: /\.(bmp|gif|jpe?g|png)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 10 * 1024,
                },
              },
              isProd && "image-webpack-loader",
            ].filter(Boolean),
          },
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: "graphql-tag/loader",
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: "svg-url-loader",
                options: {
                  limit: 10 * 1024,
                  noquotes: true,
                },
              },
              isProd && "image-webpack-loader",
            ].filter(Boolean),
          },
          {
            test: /\.(s?css|sass)$/,
            sideEffects: true,
            use: [
              !isServer && !isProd && { loader: "style-loader" },
              !isServer && isProd && { loader: MiniCssPlugin.loader, options: { esModule: true, sourceMap: true } },
              { loader: "css-modules-types-generator-loader", options: { index: true } },
              {
                loader: "css-loader",
                options: {
                  esModule: true,
                  onlyLocals: isServer,
                  importLoaders: 2,
                  sourceMap: true,
                  modules: {
                    localIdentName: isProd ? "_[hash:base64:5]" : "[path][name]__[local]--[hash:base64:5]",
                  },
                },
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true,
                  ident: "postcss",
                  plugins: () =>
                    [
                      require("postcss-flexbugs-fixes"),
                      require("postcss-preset-env")({
                        autoprefixer: {
                          flexbox: "no-2009",
                        },
                        stage: 3,
                      }),
                      isProd &&
                        require("@fullhuman/postcss-purgecss")({
                          content: ["./src/**/*.tsx"],
                          keyframes: true,
                          fontFace: true,
                          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                        }),
                      require("postcss-normalize")(),
                    ].filter(Boolean),
                },
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                },
              },
            ].filter(Boolean),
          },
          {
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  babelrc: false,
                  configFile: false,
                  cacheDirectory: true,
                  cacheCompression: !isProd,
                  compact: !isProd,
                  ...babelOptions(isServer),
                },
              },
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: !isProd,
                  configFile: path.resolve(`tsconfig.json`),
                },
              },
            ],
          },
          {
            exclude: [/\.(js|mjs|ts|tsx|scss|html|json)$/],
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "assets/[name].[contenthash:8].[ext]",
                  emitFile: !isServer,
                },
              },
              isProd && "image-webpack-loader",
            ].filter(Boolean),
          },
        ],
      },
    ],
  },
  resolve: {
    symlinks: false,
    alias: {
      "@": path.resolve("src"),
      "lodash-es": "lodash",
      "./hotPoll.js": require.resolve("./hotPoll.js"),
    },
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json", ".scss", ".sass", ".gql", ".graphql"],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      TARGET: isServer ? "server" : "web",
      PUBLIC_PATH: "/static/",
      PUBLIC_URL: "/static",
      STATIC_FOLDER: path.resolve("dist", "static"),
      MANIFEST: path.resolve("dist", "static", "manifest.json"),
      BASE_DIR: path.resolve("."),
    }),
    new webpack.WatchIgnorePlugin([/\.scss\.d\.ts/g]),
    new LodashPlugin(),
    isProd &&
      new MiniCssPlugin({
        filename: isProd ? "css/[name].[contenthash:8].css" : "index.css",
        chunkFilename: isProd ? "css/[name].[contenthash:8].css" : "[name].css",
        ignoreOrder: true,
      }),
  ].filter(Boolean),
});
