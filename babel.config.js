/* eslint-disable no-template-curly-in-string */
const path = require("path");

const isTest = process.env.NODE_ENV === "test";
const isProd = process.env.NODE_ENV === "production";

module.exports = (isServer) => {
  let targets;

  if (isServer || isTest) {
    targets = {
      node: "current",
    };
  }

  return {
    sourceMaps: true,
    inputSourceMap: true,
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
          targets,
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
      !isServer && !isProd && "react-refresh/babel",
      isTest && "babel-plugin-dynamic-import-node",
      isTest && ["@babel/plugin-transform-modules-commonjs", { loose: true }],
    ].filter(Boolean),
    overrides: [
      {
        test: "./src/server/models/*.ts",
        plugins: [["@babel/plugin-transform-modules-commonjs", { loose: true }]],
      },
    ],
  };
};
