import SequelizeStatic, { QueryInterface } from "sequelize";

import { CITY, STATE } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(CITY, {
      ...migrationDefaults(Sequelize),
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stateID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: STATE,
          key: "id",
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(CITY);
  },
};
