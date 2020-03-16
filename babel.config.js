module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        modules: false,
        useBuiltIns: "entry",
        shippedProposals: true,
        corejs: 3,
        exclude: ["transform-typeof-symbol"],
        targets: {
          node: "current",
          esmodules: true
        }
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: false,
        regenerator: true,
        helpers: true,
        useESModules: false,
        version: require("@babel/runtime/package.json").version // eslint-disable-line global-require
      }
    ]
  ]
};
