import SequelizeStatic, { QueryInterface } from "sequelize";

import { USER, PERSON } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(USER, {
      ...migrationDefaults(Sequelize),
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable(USER);
  },
};
