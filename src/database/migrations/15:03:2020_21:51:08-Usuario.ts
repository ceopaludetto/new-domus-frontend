import SequelizeStatic, { QueryInterface } from "sequelize";

import { USUARIO } from "~/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(USUARIO, {
      ...migrationDefaults(Sequelize),
      nome: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: Sequelize.STRING
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(USUARIO);
  }
};
