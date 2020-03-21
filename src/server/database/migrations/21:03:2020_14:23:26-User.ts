import SequelizeStatic, { QueryInterface } from "sequelize";

import { USER, PERSON } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(USER, {
      ...migrationDefaults(Sequelize),
      login: {
        type: Sequelize.STRING,
        unique: true
      },
      password: Sequelize.STRING,
      personID: {
        type: Sequelize.STRING,
        references: {
          key: "id",
          model: PERSON
        }
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(USER);
  }
};
