/* eslint-disable no-console */
const chalk = require("chalk");
const fns = require("date-fns");
const fs = require("fs");
const { promisify } = require("util");

const logger = require("../utils/logger");

module.exports = async (type, name, sequelize) => {
  const isMigration = type === "migration";
  const consoleName = isMigration ? "migration" : "seed";

  logger.info(`${chalk.whiteBright(`Creating new ${consoleName}:`)} ${chalk.greenBright(name)}`);

  const model = `import SequelizeStatic, { QueryInterface } from 'sequelize';

${isMigration ? "import { migrationDefaults } from '../defaults';\n" : ""}import {} from '@/utils/constants';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    // Write migration code here.
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    // If migration fails, this will be called. Rollback your migration changes.
  },
};`.trim();

  const migrationsPath = sequelize[`typescript-${isMigration ? "migrations" : "seeders"}-path`];

  const date = new Date();
  const format = `${fns.format(date, "yyyy:MM:dd_HH:mm:ss")}`;

  function capitalize(str) {
    return `${str[0].toUpperCase()}${str.substr(1)}`;
  }

  await promisify(fs.writeFile)(`${migrationsPath}/${format}-${capitalize(name) || ""}.ts`, model);

  logger.success(chalk.whiteBright(`${capitalize(consoleName)} created successfully!`));
};
