import SequelizeStatic, { QueryInterface } from "sequelize";

import { CONDOMINIUM } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(CONDOMINIUM, {
      ...migrationDefaults(Sequelize),
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
      },
      character: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(CONDOMINIUM);
  },
};
