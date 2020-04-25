import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { SequelizeModule } from "@nestjs/sequelize";
import { GraphQLSchema } from "graphql";

import {
  ConfigurationModule,
  ConfigurationService,
  UserModule,
  AuthenticationModule,
  ReactModule,
  NodemailerModule,
  EmailModule,
  LoggerModule,
  LoggerService
} from "@/server/components";
import { entities } from "@/server/models";
import { ContextType } from "@/server/utils/common.dto";

@Module({
  imports: [
    LoggerModule,
    ConfigurationModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigurationService, LoggerService],
      useFactory: ({ database }: ConfigurationService, logger: LoggerService) => ({
        dialect: database.dialect || "postgres",
        host: database.host,
        port: database.port,
        database: database.database,
        username: database.username,
        password: database.password,
        ssl: database.ssl || false,
        logging: database.logger ? sql => logger.debug(sql) : false,
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
    ReactModule,
    NodemailerModule,
    EmailModule
  ]
})
export class ApplicationModule {}
