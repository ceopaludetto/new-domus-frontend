import SequelizeStatic, { QueryInterface } from "sequelize";

import { PHONE, PERSON } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(PHONE, {
      ...migrationDefaults(Sequelize),
      ddd: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING(9),
        allowNull: false,
      },
      personID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: PERSON,
          key: "id",
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(PHONE);
  },
};
