import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { SequelizeModule } from "@nestjs/sequelize";
import { LoggerModule, PinoLogger } from "nestjs-pino";

import { ConfigurationModule, ConfigurationService, UsuarioModule, AuthenticationModule } from "~/components";
import { entities } from "~/models";
import { ContextType } from "~/utils/common.dto";
import { APP_NAME } from "~/utils/constants";

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
      useFactory: async ({ graphql }: ConfigurationService) => ({
        autoSchemaFile: graphql.schema ?? true,
        installSubscriptionHandlers: true,
        debug: process.env.NODE_ENV === "development",
        playground: process.env.NODE_ENV === "development",
        context: ({ req, res }: ContextType) => ({ req, res })
      })
    }),
    UsuarioModule,
    AuthenticationModule
  ]
})
export class ApplicationModule {}
