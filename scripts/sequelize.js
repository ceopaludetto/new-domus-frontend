/* eslint-disable global-require, import/no-dynamic-require, no-console */
const { exec } = require("child_process");
const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const { promisify } = require("util");

const { version } = require("../package.json");
const compile = require("./sequelize/compile");
const generate = require("./sequelize/generate");
const logger = require("./utils/logger");

const program = new Command();

let sequelizeConfig = {};

logger.info("Parsing commands...");

function printOptions() {
  return new Promise((resolve) => {
    if (program.verbose) {
      logger.option("verbose", true);
    }

    logger.option("enviroment", program.enviroment);

    resolve();
  });
}

async function compileFactory(type, p) {
  logger.info("Cleaning tmp folder...");
  await fs.emptyDir(sequelizeConfig[`${type === "migration" ? "migrations" : "seeders"}-path`]);
  if (!p.all || type) {
    await compile(type, sequelizeConfig);
  } else {
    await compile("migration", sequelizeConfig);
    await compile("seeders", sequelizeConfig);
  }
  logger.success("Compiled successfully");
}

program
  .version(version)
  .name("graphql")
  .option("-e, --enviroment <env>", "Set the enviroment used by sequelize", "development")
  .option("-v, --verbose", "Set the log level verbose", false);

program
  .command("compile [type]")
  .alias("c")
  .description("Compile seeds|migrations in tmp path")
  .option("-a, --all", "Compile both migrations and seeders", false)
  .action(async (type, p) => {
    await printOptions();
    return compileFactory(type, p);
  });

program
  .command("generate <type> <name>")
  .alias("g")
  .description("Generate a new seed|migration")
  .action(async (type, name) => {
    await printOptions();
    await generate(type, name, sequelizeConfig);
  });

program
  .command("run <type> [name]")
  .alias("r")
  .option("-c, --compile", "Compile before run", false)
  .option("-a, --all", "Run all seeds|migrations, -u and -a can be combined", false)
  .option("-u, --undo [name]", "Undo seed|migration", false)
  .option("--clean", "Clean tmp folder after run", true)
  .description("Generate a new seed|migration")
  .action(async (type, name, p) => {
    await printOptions();
    if (p.compile) {
      await fs.ensureDir(sequelizeConfig[`${type === "migration" ? "migrations" : "seeders"}-path`]);
      await compileFactory(type, p);
    }

    const child = promisify(exec);

    let cmd = "db:seed";

    if (type === "migration") {
      cmd = "db:migrate";
    }

    if (!name && !p.undo && !p.all) {
      throw new Error("One option must be provided");
    }

    if (p.undo) {
      cmd += ":undo";
      if (typeof p.undo === "string") {
        cmd += ` ${p.undo}`;
      }
    }

    if (p.all) {
      if (p.undo && cmd.slice(-5) === ":undo") {
        cmd += ":all";
      } else if (type !== "migration") {
        cmd += ":all";
      }
    } else if (name) {
      cmd += ` ${name}`;
    }

    const { stderr, stdout } = await child(`npx sequelize ${cmd} - env ${p.e || "development"}`);
    if (program.verbose) {
      if (stderr) {
        throw stderr;
      }

      logger.verbose(stdout);
    }
  });

async function bootstrap() {
  try {
    if (await fs.pathExists(path.resolve(".sequelizerc"))) {
      const config = require(path.resolve(".sequelizerc"));
      if (await fs.pathExists(config.config)) {
        sequelizeConfig = { ...config, connection: require(config.config) };
        delete sequelizeConfig.config;

        if (Object.keys(sequelizeConfig)) {
          await program.parseAsync(process.argv);
          logger.success("Commands executed successfully");
        }
      }
    } else {
      console.error(".sequelizerc file not found");
    }
  } catch (err) {
    if (err.stderr) {
      logger.error(err.stderr.replace("\n", ""));
    } else if (err.message) {
      logger.error(err.message);
    } else {
      logger.error("Error when run CLI");
    }
  }
}

bootstrap();
