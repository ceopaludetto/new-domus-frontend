import SequelizeStatic, { QueryInterface } from "sequelize";

import { STATE } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(STATE, {
      ...migrationDefaults(Sequelize),
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      initials: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(STATE);
  },
};
