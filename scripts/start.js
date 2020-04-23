// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === "development";
process.noDeprecation = true;

process.env.INSPECT_BRK = process.argv.find(arg => arg.match(/--inspect-brk(=|$)/)) || "";
process.env.INSPECT = process.argv.find(arg => arg.match(/--inspect(=|$)/)) || "";

const clearConsole = require("react-dev-utils/clearConsole");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");

const chalk = require("chalk");
const fs = require("fs-extra");
const logger = require("razzle-dev-utils/logger");
const printErrors = require("razzle-dev-utils/printErrors");
const setPorts = require("razzle-dev-utils/setPorts");
const webpack = require("webpack");
const DevServer = require("webpack-dev-server");

const envs = require("../configuration/envs");
const clientConfig = require("../configuration/webpack.config.client");
const serverConfig = require("../configuration/webpack.config.server");

const reg = /mini-css-extract-plugin/g;

let stats = {};

function printMessage(messages, name) {
  messages.warnings.forEach((w, i) => {
    if (reg.test(w)) {
      messages.warnings.splice(i);
    }
  });

  if (messages.warnings.length) {
    logger.log(chalk.yellow(`${name} warnings`));
    logger.log(messages.warnings.join("\n\n"));
    logger.log();
  }
}

function log() {
  clearConsole();
  stats.server.warnings = stats.server.warnings.filter(x => !/\/client/.test(x));
  stats.server.errors = stats.server.errors.filter(x => !/\/client/.test(x));

  if (
    !stats.client.warnings.length &&
    !stats.client.errors.length &&
    !stats.server.warnings.length &&
    !stats.server.errors.length
  ) {
    logger.done("Aplication compiled successfully");
    logger.log(`Access it in ${envs.PROTOCOL}://${envs.HOST}:${envs.PORT}\n`);
  }

  const serverMessages = formatWebpackMessages(stats.server);
  const clientMessages = formatWebpackMessages(stats.client);

  if (serverMessages.errors.length || clientMessages.errors.length) {
    logger.error("Failed to compile.\n");
    serverMessages.errors.forEach(e => logger.log(`${e.message || e}\n`));
    clientMessages.errors.forEach(e => logger.log(`${e.message || e}\n`));
  } else if (
    !serverMessages.errors.length &&
    !clientMessages.errors.length &&
    (serverMessages.warnings.length || clientMessages.warnings.length)
  ) {
    logger.warn("Compiled with warnings.\n");
    printMessage(serverMessages, "Server");
    printMessage(clientMessages, "Client");
    logger.log(`\nSearch for the ${chalk.underline(chalk.yellow("keywords"))} to learn more about each warning.`);
    logger.log(`To ignore, add ${chalk.cyan("// eslint-disable-next-line")} to the line before.\n`);
  }

  logger.log(`Application logs:`);
}

function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    printErrors("Failed to compile.", [e]);
    process.exit(1);
  }
  return compiler;
}

function main() {
  clearConsole();
  logger.start("Compiling...");
  fs.emptyDirSync(serverConfig.output.path);

  const clientCompiler = compile(clientConfig);
  const serverCompiler = compile(serverConfig);

  let watching = null;
  let finished = false;

  clientCompiler.hooks.beforeRun.tap("beforeRun", () => {
    finished = false;
    stats = {};
  });

  serverCompiler.hooks.beforeRun.tap("beforeRun", () => {
    finished = false;
    stats = {};
  });

  clientCompiler.hooks.done.tap("done", async st => {
    stats = { ...stats, [st.compilation.compiler.name]: st.toJson({}, true) };

    if (finished) {
      log();
    }
    finished = true;
    if (watching) return;

    watching = serverCompiler.watch(
      {
        quiet: true,
        stats: "none"
      },
      () => {} // eslint-disable-line @typescript-eslint/no-empty-function
    );
  });

  serverCompiler.hooks.done.tap("done", st => {
    stats = { ...stats, [st.compilation.compiler.name]: st.toJson({}, true) };

    if (finished) {
      log();
    }
    finished = true;
  });

  const clientDevServer = new DevServer(clientCompiler, clientConfig.devServer);

  clientDevServer.listen(envs.DEV_PORT || 3001, err => {
    if (err) {
      logger.error(err);
    }
  });
}

setPorts()
  .then(main)
  // eslint-disable-next-line no-console
  .catch(console.error);
