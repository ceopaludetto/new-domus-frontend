/* eslint-disable @typescript-eslint/camelcase */
const path = require("path");
const NodeExternals = require("webpack-node-externals");

const babelOptions = require("../../babel.config");

module.exports = files => ({
  name: "server",
  target: "node",
  mode: "development",
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [NodeExternals()],
  entry: files.reduce((entries, filename) => {
    const name = path.basename(filename, ".ts");
    return { ...entries, [name]: filename };
  }, {}),
  output: {
    path: path.resolve("tmp"),
    libraryTarget: "commonjs2",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              configFile: false,
              ...babelOptions
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: false,
              configFile: path.resolve("tsconfig.json")
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve("src")
    },
    extensions: [".js", ".json", ".ts"]
  }
});
