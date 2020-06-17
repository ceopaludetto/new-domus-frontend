import SequelizeStatic, { QueryInterface } from "sequelize";

import { STATE } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(STATE, {
      ...migrationDefaults(Sequelize),
      name: { type: Sequelize.STRING, allowNull: false },
      initials: { type: Sequelize.STRING(2), allowNull: false },
      code: { type: Sequelize.INTEGER, allowNull: false },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(STATE);
  },
};
