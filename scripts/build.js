process.env.NODE_ENV = "production";
process.noDeprecation = true;

const { measureFileSizesBeforeBuild, printFileSizesAfterBuild } = require("react-dev-utils/FileSizeReporter");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");

const chalk = require("chalk");
const fs = require("fs-extra");
const printErrors = require("razzle-dev-utils/printErrors");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const webpack = require("webpack");

const clientConfig = require("../configuration/webpack.config.client");
const serverConfig = require("../configuration/webpack.config.server");
const logger = require("./utils/logger");

const measure = process.argv.some((arg) => arg === "--measure");

const smp = new SpeedMeasurePlugin({ disable: !measure });

function capitalize(str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function normalizeFileSizes(prevFileSizes, isServer = false) {
  if (isServer)
    Object.keys(prevFileSizes.sizes).forEach((x) =>
      // eslint-disable-next-line no-param-reassign
      x !== "/index.js" ? delete prevFileSizes.sizes[x] : {}
    );
  const arr = Object.keys(prevFileSizes.sizes).map((x) => x);

  let newPrev = {};
  arr.forEach((a) => {
    newPrev = {
      ...newPrev,
      [a[0] === "/" ? a.substr(1) : a]: prevFileSizes.sizes[a],
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

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

const client = clientConfig();
const esm = clientConfig(undefined, true);
const server = serverConfig();

const configs = [server, client, esm];

Promise.all(configs.map((c) => measureFileSizesBeforeBuild(c.output.path)))
  .then(async (prevFileSizes) => {
    logger.wait("Compiling...");
    await fs.emptyDir(server.output.path);
    return prevFileSizes;
  })
  .then((prevFileSizes) => {
    configs.forEach((c, i) => {
      normalizeFileSizes(prevFileSizes[i], i === 0);
    });
    return Promise.all(configs.map((c, i) => build(prevFileSizes[i], smp.wrap(c), c.target === "node")));
  })
  .then((info) => {
    info.forEach(({ stats, previousFileSizes, warnings }, i) => {
      if (warnings.length) {
        logger.warning("Compiled with warnings.\n");
        logger.log(warnings.join("\n\n"));
        logger.log(`\nSearch for the ${chalk.underline(chalk.yellow("keywords"))} to learn more about each warning.`);
        logger.log(`To ignore, add ${chalk.cyan("// eslint-disable-next-line")} to the line before.\n`);
      }

      logger.done(`${capitalize(configs[i].name)} Compiled done.`);
      logger.log("File sizes after gzip:\n");
      printFileSizesAfterBuild(stats, previousFileSizes, configs[i].output.path);
      logger.log();
    });

    return info;
  })
  .catch((err) => {
    logger.error("Failed to compile.\n");
    logger.log(`${err.message || err}\n`);
    process.exit(1);
  });
