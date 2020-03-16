/* eslint-disable no-console */
const chalk = require("chalk");
const fns = require("date-fns");
const fs = require("fs");
const { promisify } = require("util");

module.exports = async (type, name, sequelize, spinner) => {
  const isMigration = type === "migration";
  const consoleName = isMigration ? "migration" : "seed";

  spinner.text = `${chalk.whiteBright(`Creating new ${consoleName}:`)} ${chalk.greenBright(name)}`;

  const model = `import SequelizeStatic, { QueryInterface } from 'sequelize';

${isMigration ? "import { migrationDefaults } from '../defaults';\n" : ""}import {} from '~/utils/constants';

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
  const format = `${fns.format(date, "dd:MM:yyyy_HH:mm:ss")}`;

  function capitalize(str) {
    return `${str[0].toUpperCase()}${str.substr(1)}`;
  }

  await promisify(fs.writeFile)(`${migrationsPath}/${format}-${capitalize(name) || ""}.ts`, model);

  spinner.text = chalk.whiteBright(`${capitalize(consoleName)} created successfully!`);
};
