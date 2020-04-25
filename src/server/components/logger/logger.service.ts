import { Injectable, LoggerService as ILogger } from "@nestjs/common";
import chalk from "chalk";
import { format as dateFormat, parseISO } from "date-fns";
import { createLogger, transports, Logger, format } from "winston";

import { APP_NAME } from "@/server/utils/constants";

const { combine, prettyPrint, timestamp, label, printf } = format;

@Injectable()
export class LoggerService implements ILogger {
  private logger: Logger;

  private colors: { [index: string]: chalk.Chalk } = {
    info: chalk.cyanBright,
    error: chalk.redBright,
    warn: chalk.yellowBright,
    verbose: chalk.whiteBright
  };

  public constructor() {
    const custom = printf(({ level, message, label: l, timestamp: t }) => {
      const formattedLevel = this.colors[level]?.(level.toUpperCase()) ?? chalk.whiteBright(level.toUpperCase());
      const date = dateFormat(parseISO(t), "hh:mm:ss");

      return `[${formattedLevel}] ${chalk.whiteBright(date)} ${chalk.greenBright(l)} - ${message}`;
    });

    this.logger = createLogger({
      level: "info",
      format: combine(
        label({ label: APP_NAME }),
        timestamp(),
        process.env.NODE_ENV === "production" ? prettyPrint() : custom
      ),
      transports: [
        ...(process.env.NODE_ENV === "production"
          ? [
              new transports.File({
                dirname: "logs",
                filename: "combined.log"
              }),
              new transports.File({
                dirname: "logs",
                filename: "error.log",
                level: "error"
              })
            ]
          : [new transports.Console()])
      ]
    });
  }

  public log(message: any, context?: string) {
    return this.logger.info(message, context);
  }

  public error(message: any, trace?: string, context?: string) {
    return this.logger.error(message, trace, context);
  }

  public warn(message: any, context?: string) {
    return this.logger.warn(message, context);
  }

  public debug(message: any, context?: string) {
    return this.logger.debug(message, context);
  }

  public verbose(message: any, context?: string) {
    return this.logger.verbose(message, context);
  }
}
