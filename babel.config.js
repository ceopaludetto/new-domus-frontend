module.exports = (api) => {
  api.cache(false);

  return {
    presets: ["razzle/babel"],
    plugins: ["lodash", "optimize-clsx", "@loadable/babel-plugin"],
  };
};
