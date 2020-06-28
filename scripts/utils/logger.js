/* eslint-disable no-console */
const chalk = require("chalk");

class Logger {
  info(msg) {
    console.log(`${chalk.blue("Info")} ${msg}`);
  }

  verbose(msg) {
    const isMultiline = /\n/.test(msg);

    if (isMultiline) {
      console.log(`${chalk.white("Verbose")}\n ${msg} \n${chalk.white("verbose")}`);
    } else {
      console.log(`${chalk.white("Verbose")} ${msg}`);
    }
  }

  wait(msg) {
    console.log(`${chalk.blue("Wait")} ${msg}`);
  }

  warning(msg) {
    console.log(`${chalk.yellow("Warning")} ${msg}`);
  }

  done(msg) {
    console.log(`${chalk.green("Done")} ${msg}`);
  }

  success(msg) {
    console.log(`${chalk.green("Success")} ${msg}`);
  }

  error(msg) {
    console.log(`${chalk.red("Error")} ${msg}`);
  }

  option(msg, value) {
    console.log(`${chalk.yellow(msg)} ${value}`);
  }

  log(msg) {
    console.log(msg || "");
  }
}

module.exports = new Logger();
