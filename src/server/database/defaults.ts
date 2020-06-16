import SequelizeStatic from "sequelize";
import { generate } from "shortid";

export const migrationDefaults = (Sequelize: typeof SequelizeStatic): SequelizeStatic.ModelAttributes => ({
  id: {
    primaryKey: true,
    type: Sequelize.STRING,
    defaultValue: generate,
    allowNull: false,
  },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false },
  deletedAt: Sequelize.DATE,
});
