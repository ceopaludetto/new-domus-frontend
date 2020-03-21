import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { SequelizeModule } from "@nestjs/sequelize";
import { GraphQLSchema } from "graphql";
import { LoggerModule, PinoLogger } from "nestjs-pino";

import {
  ConfigurationModule,
  ConfigurationService,
  UserModule,
  AuthenticationModule,
  ReactModule
} from "@/server/components";
import { entities } from "@/server/models";
import { ContextType } from "@/server/utils/common.dto";
import { APP_NAME } from "@/server/utils/constants";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        name: APP_NAME,
        autoLogging: process.env.NODE_ENV === "production",
        level: process.env.NODE_ENV !== "production" ? "debug" : "info",
        prettyPrint:
          process.env.NODE_ENV === "development"
            ? {
                translateTime: "dd/mm/yyyy, hh:MM:ss:l",
                ignore: "context,pid,req",
                levelFirst: true
              }
            : false,
        useLevelLabels: true
      }
    }),
    ConfigurationModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigurationService, PinoLogger],
      useFactory: ({ database }: ConfigurationService, pino: PinoLogger) => ({
        dialect: database.dialect || "postgres",
        host: database.host,
        port: database.port,
        database: database.database,
        username: database.username,
        password: database.password,
        ssl: database.ssl || false,
        logging: database.logger ? sql => pino.debug(sql) : false,
        models: entities
      })
    }),
    GraphQLModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: async ({ graphql, setSchema }: ConfigurationService) => ({
        autoSchemaFile: graphql.schema ?? true,
        installSubscriptionHandlers: true,
        debug: process.env.NODE_ENV === "development",
        playground: process.env.NODE_ENV === "development",
        context: ({ req, res }: ContextType) => ({ req, res }),
        transformSchema: (schema: GraphQLSchema) => {
          setSchema(schema);
          return schema;
        }
      })
    }),
    UserModule,
    AuthenticationModule,
    ReactModule
  ]
})
export class ApplicationModule {}
