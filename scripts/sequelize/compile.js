const glob = require("glob");
const webpack = require("webpack");

const config = require("./compile.config");

module.exports = (type, sequelizeConfig, spinner) => {
  const isMigration = type === "migration";

  return new Promise((resolve, reject) => {
    try {
      const files = glob.sync(`${sequelizeConfig[`typescript-${isMigration ? "migrations" : "seeders"}-path`]}/*.ts`);

      spinner.text = `Found ${files.length} ${isMigration ? "migrations" : "seeders"}`;
      if (files.length) {
        const compiler = webpack(config(files));

        compiler.run();

        compiler.hooks.done.tap("done", () => {
          resolve();
        });
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
