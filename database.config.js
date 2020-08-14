const path = require("path");

const configuration = require("./configuration/get.database.config");

module.exports = {
  knex: {
    client: configuration.client,
    connection: {
      host: configuration.host,
      port: configuration.port,
      user: configuration.username,
      password: configuration.password,
      database: configuration.database,
    },
  },
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
