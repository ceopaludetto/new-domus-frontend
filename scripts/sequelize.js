/* eslint-disable global-require, import/no-dynamic-require, no-console */
const { exec } = require("child_process");
const { Command } = require("commander");
const fs = require("fs-extra");
const ora = require("ora");
const path = require("path");
const { promisify } = require("util");

const { version } = require("../package.json");
const compile = require("./sequelize/compile");
const generate = require("./sequelize/generate");

const program = new Command();

let sequelizeConfig = {};

const spinner = ora("Parsing commands");
spinner.spinner = "bouncingBar";

async function compileFactory(type, p) {
  spinner.text = "Cleaning tmp folder...";
  await fs.remove(sequelizeConfig[`${type === "migration" ? "migrations" : "seeders"}-path`]);
  spinner.text = "Compiling...";
  if (!p.all) {
    await compile(type, sequelizeConfig).then(() => {
      spinner.text = "Compiled successfully";
    });
  } else {
    await compile("migration", sequelizeConfig, spinner);
    await compile("seeders", sequelizeConfig, spinner);
    spinner.text = "Compiled successfully";
  }
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
    spinner.start();
    return compileFactory(type, p);
  });

program
  .command("generate <type> <name>")
  .alias("g")
  .description("Generate a new seed|migration")
  .action(async (type, name) => {
    spinner.start();
    await generate(type, name, sequelizeConfig, spinner);
  });

program
  .command("run <type> [name]")
  .alias("r")
  .option("-c, --compile", "Compile before run", false)
  .option("-u, --undo [name]", "Undo seed|migration", false)
  .option("-a, --all", "Run all seeds|migrations, -u and -a can be combined", false)
  .option("--clean", "Clean tmp folder after run", true)
  .description("Generate a new seed|migration")
  .action(async (type, name, p) => {
    spinner.start();
    if (p.compile) {
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
    if (p.verbose) {
      if (stderr) {
        throw stderr;
      }

      spinner.text = stdout;
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
          spinner.succeed();
        }
      }
    } else {
      console.error(".sequelizerc file not found");
    }
  } catch (err) {
    if (err.stderr) {
      spinner.fail(err.stderr.replace("\n", ""));
    } else if (err.message) {
      spinner.fail(err.message);
    } else {
      spinner.fail("Error when run CLI");
    }
  }
}

bootstrap();
