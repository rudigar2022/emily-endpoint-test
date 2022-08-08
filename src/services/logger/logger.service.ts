import { injectable } from "inversify";
import "reflect-metadata";
import * as Winston from "winston";
import * as WinstonDailyRotateFile from "winston-daily-rotate-file";

import * as Configurations from "../../configurations/configurations.json";

@injectable()
export class LoggerService {
  protected logger: Winston.Logger;

  /**
   * Default LoggerService Constructor
   */
  constructor() {
    this.logger = Winston.createLogger({
      level: "info", //Log only if info.level less than or equal to this level
      levels: Winston.config.npm.levels, //Levels (and colors) representing log priorities
      format: Winston.format.combine(
        Winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        Winston.format.errors({ stack: true }),
        Winston.format.splat(),
        Winston.format.json()
      ), //Levels (and colors) representing log priorities
      exitOnError: false, //If false, handled exceptions will not cause process.exit
      silent: false, //If true, all logs are suppressed
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new Winston.transports.File({
          filename: `logs/${Configurations.winstonLogger.infoFileName}.log`,
        }),
        new WinstonDailyRotateFile({
          filename: `logs/${Configurations.winstonLogger.errorsFileName}-%DATE%.log`,
          datePattern: "YYYY-MM-DD",
        }),
      ],
    });

    // If we're not in production then **ALSO** log to the `console`
    // with the colorized simple format.
    //
    if (Configurations.winstonLogger.environment !== "production") {
      this.logger.add(
        new Winston.transports.Console({
          format: Winston.format.combine(
            Winston.format.colorize(),
            Winston.format.simple()
          ),
        })
      );
    }
  }

  /**
   * debug
   */
  public debug(formattedMessage: any) {
    this.logger.debug(formattedMessage);
  }

  /**
   * verbose
   */
  public verbose(formattedMessage: any) {
    this.logger.verbose(formattedMessage);
  }

  /**
   * info
   */
  public info(formattedMessage: any) {
    this.logger.info(formattedMessage);
  }

  /**
   * warning
   */
  public warning(formattedMessage: any) {
    this.logger.warn(formattedMessage);
  }

  /**
   * error
   */
  public error(formattedMessage: any) {
    this.logger.error(formattedMessage);
  }
}
