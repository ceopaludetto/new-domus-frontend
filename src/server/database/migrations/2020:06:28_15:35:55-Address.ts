import SequelizeStatic, { QueryInterface } from "sequelize";

import { ADDRESS, CITY, CONDOMINIUM } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(ADDRESS, {
      ...migrationDefaults(Sequelize),
      cep: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cityID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: CITY,
          key: "id",
        },
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
    return queryInterface.dropTable(ADDRESS);
  },
};
