import SequelizeStatic, { QueryInterface } from "sequelize";

import { Gender } from "@/server/models/person.model";
import { PERSON } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(PERSON, {
      ...migrationDefaults(Sequelize),
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM(Gender.F, Gender.M, Gender.N),
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(PERSON);
  },
};
