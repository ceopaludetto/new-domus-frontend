import SequelizeStatic, { QueryInterface } from "sequelize";

import { Gender } from "@/server/models/person.model";
import { PERSON } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(PERSON, {
      ...migrationDefaults(Sequelize),
      name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      gender: { type: Sequelize.ENUM(Gender.F, Gender.M, Gender.N), defaultValue: Gender.M },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(PERSON);
  },
};
