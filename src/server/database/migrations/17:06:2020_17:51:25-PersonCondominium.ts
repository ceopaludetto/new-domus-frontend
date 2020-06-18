import SequelizeStatic, { QueryInterface } from "sequelize";

import { PERSON_CONDOMINIUM, PERSON, CONDOMINIUM } from "@/server/utils/constants";

import { migrationDefaults } from "../defaults";

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    return queryInterface.createTable(PERSON_CONDOMINIUM, {
      ...migrationDefaults(Sequelize),
      personID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: PERSON,
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
    return queryInterface.dropTable(PERSON_CONDOMINIUM);
  },
};
