import SequelizeStatic from "sequelize";
import { generate } from "shortid";

export const migrationDefaults = (Sequelize: typeof SequelizeStatic) => ({
  id: {
    primaryKey: true,
    type: Sequelize.STRING,
    defaultValue: generate,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  deletedAt: Sequelize.DATE,
});
