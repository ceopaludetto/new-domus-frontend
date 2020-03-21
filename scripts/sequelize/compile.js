const glob = require("glob");
const webpack = require("webpack");

const logger = require("../utils/logger");
const config = require("./compile.config");

module.exports = (type, sequelizeConfig) => {
  const isMigration = type === "migration";

  return new Promise((resolve, reject) => {
    try {
      const files = glob.sync(`${sequelizeConfig[`typescript-${isMigration ? "migrations" : "seeders"}-path`]}/*.ts`);

      if (files.length) {
        logger.info(`Found ${files.length} ${isMigration ? "migrations" : "seeders"}`);
        logger.info("Compiling...");
        const compiler = webpack(config(files));

        compiler.run();

        compiler.hooks.done.tap("done", () => {
          resolve();
        });
      } else {
        logger.error(`No ${isMigration ? "migrations" : "seeders"} found`);
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
