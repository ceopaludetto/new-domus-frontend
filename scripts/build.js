process.env.NODE_ENV = "production";
process.noDeprecation = true;

const clearConsole = require("react-dev-utils/clearConsole");
const FileSizeReporter = require("react-dev-utils/FileSizeReporter");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");

const chalk = require("chalk");
const fs = require("fs-extra");
const logger = require("razzle-dev-utils/logger");
const printErrors = require("razzle-dev-utils/printErrors");
const webpack = require("webpack");

const { measureFileSizesBeforeBuild } = FileSizeReporter;
const { printFileSizesAfterBuild } = FileSizeReporter;

const clientConfig = require("../configuration/webpack.config.client");
const serverConfig = require("../configuration/webpack.config.server");

const reg = /mini-css-extract-plugin/g;

function normalizeFileSizes(prevFileSizes, isServer = false) {
  if (isServer)
    Object.keys(prevFileSizes.sizes).forEach(x =>
      // eslint-disable-next-line no-param-reassign
      x !== "/index.js" ? delete prevFileSizes.sizes[x] : {}
    );
  const arr = Object.keys(prevFileSizes.sizes).map(x => x);

  let newPrev = {};
  arr.forEach(a => {
    newPrev = {
      ...newPrev,
      [a[0] === "/" ? a.substr(1) : a]: prevFileSizes.sizes[a]
    };
  });

  // eslint-disable-next-line no-param-reassign
  prevFileSizes.sizes = newPrev;
}

function compile(config, cb) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    printErrors("Failed to compile.", [e]);
    process.exit(1);
  }
  compiler.run((err, stats) => {
    cb(err, stats);
  });
}

function build(previousFileSizes, config, isServer = false) {
  process.env.TARGET = isServer ? "server" : "client";

  return new Promise((resolve, reject) => {
    compile(config, (err, stats) => {
      if (err) {
        return reject(err);
      }

      const messages = formatWebpackMessages(stats.toJson({}, true));

      if (messages.errors.length) {
        return reject(new Error(messages.errors.join("\n\n")));
      }

      messages.warnings.forEach((w, i) => {
        if (reg.test(w)) {
          messages.warnings.splice(i);
        }
      });

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings
      });
    });
  });
}

Promise.all([
  measureFileSizesBeforeBuild(serverConfig.output.path),
  measureFileSizesBeforeBuild(clientConfig.output.path)
])
  .then(prevFileSizes => {
    clearConsole();
    logger.start("Compiling...");
    fs.emptyDir(serverConfig.output.path);
    return prevFileSizes;
  })
  .then(prevFileSizes => {
    normalizeFileSizes(prevFileSizes[0], true);
    normalizeFileSizes(prevFileSizes[1], false);
    return Promise.all([build(prevFileSizes[0], serverConfig, true), build(prevFileSizes[1], clientConfig, false)]);
  })
  .then(
    info => {
      info.forEach(({ stats, previousFileSizes, warnings }, i) => {
        if (warnings.length) {
          logger.warn("Compiled with warnings.\n");
          logger.log(warnings.join("\n\n"));
          logger.log(`\nSearch for the ${chalk.underline(chalk.yellow("keywords"))} to learn more about each warning.`);
          logger.log(`To ignore, add ${chalk.cyan("// eslint-disable-next-line")} to the line before.\n`);
        }
        logger.done(`[${i === 0 ? "SERVER" : "CLIENT"}] Compiled done.`);
        logger.log("File sizes after gzip:\n");
        printFileSizesAfterBuild(
          stats,
          previousFileSizes,
          i === 0 ? serverConfig.output.path : clientConfig.output.path
        );
        logger.log();
      });
    },
    err => {
      logger.error("Failed to compile.\n");
      logger.log(`${err.message || err}\n`);
      process.exit(1);
    }
  );
