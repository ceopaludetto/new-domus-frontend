const path = require("path");

const configuration = require("./configuration/get.sequelize.config");

module.exports = {
  sequelize: configuration,
  banners: ['import { } from "@/server/utils/constants";', 'import { migrationDefaults } from "../defaults";'],
  migrations: "./src/server/database/migrations",
  seeds: "./src/server/database/seeds",
  customize(config) {
    config.resolve.alias = {
      "@": path.resolve("src"),
    };

    return config;
  },
};
