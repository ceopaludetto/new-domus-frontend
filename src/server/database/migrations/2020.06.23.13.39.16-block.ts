import SequelizeStatic, { QueryInterface } from "sequelize";

import { BLOCK, CONDOMINIUM } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(BLOCK, {
      ...migrationDefaults(Sequelize),
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      condominiumID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: CONDOMINIUM,
          key: "id",
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(BLOCK);
  },
};
