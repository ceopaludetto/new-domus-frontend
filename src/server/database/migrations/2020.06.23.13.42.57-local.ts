import SequelizeStatic, { QueryInterface } from "sequelize";

import { LOCAL, CONDOMINIUM, BLOCK } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(LOCAL, {
      ...migrationDefaults(Sequelize),
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      blockID: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: BLOCK,
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
    return queryInterface.dropTable(LOCAL);
  },
};
