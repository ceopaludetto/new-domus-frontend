import SequelizeStatic, { QueryInterface } from "sequelize";

import { Gender } from "@/server/models/person.model";
import { PERSON } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(PERSON, {
      ...migrationDefaults(Sequelize),
      name: { type: Sequelize.STRING, allowNull: false },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      gender: { type: Sequelize.ENUM(Gender.F, Gender.M, Gender.N), defaultValue: Gender.M, allowNull: false },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(PERSON);
  },
};
