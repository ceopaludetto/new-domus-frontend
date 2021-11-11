const { addBabelPluginsOrPresets } = require("@ceop/utils");

/**
 * @type import("@ceop/utils").Plugin
 */
const addOptimizeClsx = (configuration) => {
  addBabelPluginsOrPresets(configuration, "plugins", ["optimize-clsx"]);

  return configuration;
};

/**
 * @type import("@ceop/core").CeopConfiguration
 */
const configuration = {
  mode: "both",
  plugins: [addOptimizeClsx, "@ceop/plugin-loadable", "@ceop/plugin-compress", "@ceop/plugin-file"],
};

module.exports = configuration;
