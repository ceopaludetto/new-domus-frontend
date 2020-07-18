/* eslint-disable no-template-curly-in-string */
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

module.exports = (isServer = false, isTest = false) => ({
  sourceMaps: true,
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        modules: false,
        useBuiltIns: "usage",
        shippedProposals: true,
        corejs: 3,
        bugfixes: true,
        exclude: ["transform-typeof-symbol"],
        configPath: path.resolve(process.cwd()),
        browserslistEnv: process.env.NODE_ENV || "development",
        ...(isServer || isTest
          ? {
              targets: {
                node: "current",
              },
            }
          : {}),
      },
    ],
    [
      "@babel/preset-react",
      {
        useBuiltIns: true,
        development: !isProd,
      },
    ],
  ],
  plugins: [
    "lodash",
    "date-fns",
    "optimize-clsx",
    "@loadable/babel-plugin",
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: false,
        regenerator: true,
        helpers: true,
        useESModules: !isServer,
        version: require("@babel/runtime/package.json").version, // eslint-disable-line global-require
      },
    ],
    ["transform-react-remove-prop-types", { mode: "remove", removeImport: true }],
    ...(isTest
      ? ["babel-plugin-dynamic-import-node", ["@babel/plugin-transform-modules-commonjs", { loose: true }]]
      : []),
  ],
  overrides: [
    {
      test: "./src/server/models/*.ts",
      plugins: [["@babel/plugin-transform-modules-commonjs", { loose: true }]],
    },
  ],
});
