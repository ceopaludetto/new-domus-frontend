import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { SequelizeModule } from "@nestjs/sequelize";
import { GraphQLSchema } from "graphql";
import { LoggerModule, PinoLogger } from "nestjs-pino";

import {
  ConfigurationService,
  AuthenticationModule,
  ConfigurationModule,
  CondominiumModule,
  PersonModule,
  ReactModule,
  QueueModule,
  StateModule,
  CityModule,
  UserModule,
} from "@/server/components";
import Entities from "@/server/models";
import { ContextType } from "@/server/utils/common.dto";
import { APP_NAME } from "@/server/utils/constants";
import { ComplexityPlugin } from "@/server/utils/plugins/query.complexity.plugin";

@Module({
  imports: [
    QueueModule,
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
                levelFirst: true,
              }
            : false,
      },
    }),
    ConfigurationModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigurationService, PinoLogger],
      useFactory: ({ database }: ConfigurationService, logger: PinoLogger) => ({
        dialect: database.dialect || "postgres",
        host: database.host,
        port: database.port,
        database: database.database,
        username: database.username,
        password: database.password,
        ssl: database.ssl || false,
        logging: database.logger ? (sql) => logger.debug(sql) : false,
        minifyAliases: true,
        native: true,
        models: Entities,
      }),
    }),
    MailerModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: async ({ mailer }: ConfigurationService) => ({
        transport: {
          host: mailer.host,
          port: mailer.port,
          auth: mailer.auth,
        },
        template: {
          dir: mailer.template.dir,
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    GraphQLModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: async ({ graphql, schema }: ConfigurationService) => ({
        autoSchemaFile: graphql.schema ?? true,
        installSubscriptionHandlers: true,
        debug: process.env.NODE_ENV === "development",
        playground: process.env.NODE_ENV === "development",
        introspection: process.env.NODE_ENV === "development",
        cors: {
          credentials: true,
          maxAge: 7200,
        },
        context: ({ req, res }: ContextType) => ({ req, res }),
        transformSchema: (s: GraphQLSchema) => {
          schema = s;
          return schema;
        },
      }),
    }),
    UserModule,
    PersonModule,
    AuthenticationModule,
    CondominiumModule,
    ReactModule,
    StateModule,
    CityModule,
  ],
  providers: [ComplexityPlugin],
})
export class ApplicationModule {}
