/* eslint-disable global-require */
const eslintFormatter = require("react-dev-utils/eslintFormatter");

const LodashPlugin = require("lodash-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const safePostCssParser = require("postcss-safe-parser");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production";
const isDebug = process.env.INSPECT_BRK || process.env.INSPECT || false;

function resolveDevTool() {
  if (isDebug) {
    return "source-map";
  }

  if (isProd) {
    return "hidden-source-map";
  }

  return "inline-source-map";
}

module.exports = (isServer = false, isESM = false) => ({
  bail: isProd,
  name: isServer ? "Server" : "Client",
  devtool: resolveDevTool(),
  mode: isProd ? "production" : "development",
  performance: false,
  watchOptions: {
    ignored: [/node_modules/, /dist/],
  },
  optimization: {
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
          sourceMap: true,
          ecma: 8,
          module: isESM,
          compress: {
            ecma: 5,
          },
          output: {
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
        test: /\.(bmp|gif|jpe?g|png)$/,
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
              sourceMap: true,
              importLoaders: 2,
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
                    features: {
                      "prefers-color-scheme-query": false,
                    },
                    stage: 1,
                  }),
                  isProd &&
                    require("@fullhuman/postcss-purgecss")({
                      content: ["./src/**/*.tsx"],
                      keyframes: true,
                      fontFace: true,
                      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                    }),
                  require("postcss-normalize"),
                ].filter(Boolean),
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require("sass"),
              sassOptions: {
                includePaths: [path.resolve("node_modules")],
              },
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
              configFile: path.resolve("babel.config.js"),
              cacheDirectory: true,
              cacheCompression: !isProd,
              compact: !isProd,
              caller: {
                isESM,
              },
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
        exclude: [/\.(m?jsx?|tsx?|s?css|html|json|graphql|gql|bmp|gif|jpe?g|png)$/],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[contenthash:8].[ext]",
              emitFile: !isServer,
            },
          },
        ].filter(Boolean),
      },
    ],
  },
  resolve: {
    symlinks: false,
    alias: {
      "@": path.resolve("src"),
      "lodash-es": "lodash",
      "webpack/hot/poll": require.resolve("webpack/hot/poll"),
      "react-dom": isProd && !isServer ? "@pika/react-dom" : "react-dom",
      react: isProd && !isServer ? "@pika/react" : "react",
    },
    mainFields: isServer ? ["main", "module"] : ["browser", "module", "main"],
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json", ".scss", ".graphql"],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      TARGET: isServer ? "server" : "web",
      PUBLIC_URL: "/static",
      STATIC_FOLDER: path.resolve("dist", "static"),
      MANIFEST: path.resolve("dist", "static", "manifest.json"),
      MANIFEST_ESM: path.resolve("dist", "static", "manifest.esm.json"),
      BASE_DIR: path.resolve("."),
    }),
    new webpack.WatchIgnorePlugin([/\.scss\.d\.ts/g, "src/server/schema.gql"]),
    new LodashPlugin(),
    isProd &&
      new MiniCssPlugin({
        filename: isProd ? "css/[name].[contenthash:8].css" : "index.css",
        chunkFilename: isProd ? "css/[name].[contenthash:8].css" : "[name].css",
        ignoreOrder: true,
      }),
  ].filter(Boolean),
});
