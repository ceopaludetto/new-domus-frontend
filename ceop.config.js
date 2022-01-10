const { addBabelPluginsOrPresets } = require("@ceop/utils");

/**
 * @type import("@ceop/utils").Plugin
 */
const addGraphqlTagBabelPlugin = (configuration) => {
  return addBabelPluginsOrPresets(configuration, "plugins", [["graphql-tag", { strip: true }]]);
};

/**
 * @type import("@ceop/core").CeopConfiguration
 */
const configuration = {
  mode: "both",
  plugins: [addGraphqlTagBabelPlugin, "@ceop/plugin-loadable", "@ceop/plugin-compress", "@ceop/plugin-file"],
};

module.exports = configuration;
