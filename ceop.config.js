const { addBabelPluginsOrPresets } = require("@ceop/utils");

/**
 * @type import("@ceop/utils").Plugin
 */
const addBabelPlugins = (configuration) => {
  configuration.resolve.alias = { ...configuration.resolve.alias, "lodash-es": "lodash" };
  return addBabelPluginsOrPresets(configuration, "plugins", ["lodash", ["graphql-tag", { strip: true }]]);
};

/**
 * @type import("@ceop/core").CeopConfiguration
 */
const configuration = {
  mode: "both",
  plugins: [addBabelPlugins, "@ceop/plugin-loadable", "@ceop/plugin-compress", "@ceop/plugin-file"],
};

module.exports = configuration;
