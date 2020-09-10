function isServer(caller) {
  return caller.target === "node";
}

module.exports = (api) => {
  const isNode = api.caller(isServer);

  return {
    presets: ["razzle/babel"],
    plugins: [
      "lodash",
      "optimize-clsx",
      "@loadable/babel-plugin",
      [
        "transform-imports",
        {
          "@material-ui/core": {
            transform: `@material-ui/core/${isNode ? "" : "esm/"}\${member}`,
            preventFullImport: true,
          },
          "@material-ui/icons": {
            transform: `@material-ui/icons/${isNode ? "" : "esm/"}\${member}`,
            preventFullImport: true,
          },
        },
      ],
    ],
  };
};
