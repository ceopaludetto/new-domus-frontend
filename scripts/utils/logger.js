/* eslint-disable no-console */
const chalk = require("chalk");

class Logger {
  info(msg) {
    console.log(`${chalk.blue("info")} ${msg}`);
  }

  verbose(msg) {
    const isMultiline = /\n/.test(msg);

    if (isMultiline) {
      console.log(`${chalk.white("verbose")}\n ${msg} \n${chalk.white("verbose")}`);
    } else {
      console.log(`${chalk.white("verbose")} ${msg}`);
    }
  }

  success(msg) {
    console.log(`${chalk.green("success")} ${msg}`);
  }

  error(msg) {
    console.log(`${chalk.red("error")} ${msg}`);
  }

  option(msg, value) {
    console.log(`${chalk.yellow(msg)} ${value}`);
  }
}

module.exports = new Logger();
