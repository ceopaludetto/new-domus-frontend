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
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(CONDOMINIUM);
  },
};
