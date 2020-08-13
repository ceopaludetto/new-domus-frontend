/* eslint-disable no-template-curly-in-string */
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

function isNode(caller) {
  return caller.target === "node";
}

function isJest(caller) {
  return caller.name === "babel-jest";
}

function isModule(caller) {
  return caller.isESM;
}

module.exports = (api) => {
  let env = { targets: {} };

  const isServer = api.caller(isNode);
  const isTest = api.caller(isJest);
  const isESM = api.caller(isModule);

  api.cache(false);

  if (isServer || isTest) {
    env = {
      ignoreBrowserslistConfig: true,
      targets: {
        node: "current",
      },
    };
  } else if (isESM) {
    env = {
      ignoreBrowserslistConfig: true,
      targets: {
        esmodules: true,
      },
    };
  } else {
    env = {
      configPath: path.resolve(process.cwd()),
      browserslistEnv: process.env.NODE_ENV || "development",
    };
  }

  return {
    sourceMaps: true,
    inputSourceMap: true,
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          useBuiltIns: "usage",
          corejs: 3,
          bugfixes: true,
          loose: isServer,
          exclude: ["transform-typeof-symbol"],
          ...env,
        },
      ],
      [
        "@babel/preset-react",
        {
          useSpread: true,
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
      !isServer && !isProd && !isTest && "react-refresh/babel",
      isTest && ["@babel/plugin-transform-modules-commonjs", { loose: true }],
      isTest && "dynamic-import-node",
    ].filter(Boolean),
    overrides: [
      {
        test: "./src/server/models/*.ts",
        plugins: [["@babel/plugin-transform-modules-commonjs", { loose: true }]],
      },
    ],
  };
};
