import { Injectable } from "@nestjs/common";
import fs from "fs";
import { PinoLogger } from "nestjs-pino";
import { Dialect } from "sequelize";
import yaml from "yaml";
import * as Yup from "yup";

import { REQUIRED, DIALECT } from "~/utils/constants";

const EnvSchema = Yup.object({
  database: Yup.object({
    dialect: Yup.mixed<Dialect>()
      .oneOf(["mysql", "postgres", "sqlite", "mariadb", "mssql", "mariadb"], DIALECT)
      .required(REQUIRED),
    host: Yup.string().required(REQUIRED),
    port: Yup.number().required(REQUIRED),
    database: Yup.string().required(REQUIRED),
    username: Yup.string().required(REQUIRED),
    password: Yup.string().required(REQUIRED),
    ssl: Yup.boolean(),
    logger: Yup.boolean()
  }),
  auth: Yup.object({
    secret: Yup.string().required(REQUIRED)
  }),
  graphql: Yup.object({
    schema: Yup.string()
  })
});

type EnvConfig = Yup.InferType<typeof EnvSchema>;

@Injectable()
export class ConfigurationService {
  private readonly envConfig!: EnvConfig;

  public constructor(filePath: string, private readonly logger: PinoLogger) {
    const config = yaml.parse(fs.readFileSync(filePath, "UTF-8"));
    const validated = this.validateInput(config);
    if (validated !== false) {
      this.envConfig = validated;
    }
  }

  private validateInput = (config: any) => {
    try {
      EnvSchema.validateSync(config, { abortEarly: true });

      return config as EnvConfig;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        this.logger.error(error.message);
      }

      return false;
    }
  };

  public get database() {
    return this.envConfig.database;
  }

  public get auth() {
    return this.envConfig.auth;
  }

  public get graphql() {
    return this.envConfig.graphql;
  }
}
