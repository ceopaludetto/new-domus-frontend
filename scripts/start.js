// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === "development";
process.noDeprecation = true;

process.env.INSPECT_BRK = process.argv.find((arg) => arg.match(/--inspect-brk(=|$)/)) || "";
process.env.INSPECT = process.argv.find((arg) => arg.match(/--inspect(=|$)/)) || "";

const clearConsole = require("react-dev-utils/clearConsole");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");

const chalk = require("chalk");
const fs = require("fs-extra");
const ip = require("ip");
const logger = require("razzle-dev-utils/logger");
const printErrors = require("razzle-dev-utils/printErrors");
const setPorts = require("razzle-dev-utils/setPorts");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const webpack = require("webpack");

const SilentDevServer = require("../configuration/devServer");
const envs = require("../configuration/envs");
const clientConfig = require("../configuration/webpack.config.client");
const serverConfig = require("../configuration/webpack.config.server");

const measure = process.argv.some((arg) => arg === "--measure" || arg === "-m");
const verbose = process.argv.some((arg) => arg === "--verbose" || arg === "-v");

if (verbose) {
  process.env.VERBOSE = verbose;
}

const smp = new SpeedMeasurePlugin({ disable: !measure });

let stats = {};

function printMessage(messages, name) {
  if (messages.warnings.length) {
    logger.log(chalk.yellow(`${name} warnings`));
    logger.log(messages.warnings.join("\n\n"));
    logger.log();
  }
}

function log() {
  if (!measure && !verbose) clearConsole();
  stats.server.warnings = stats.server.warnings.filter((x) => !/\/client/.test(x));
  stats.server.errors = stats.server.errors.filter((x) => !/\/client/.test(x));

  if (
    !stats.client.warnings.length &&
    !stats.client.errors.length &&
    !stats.server.warnings.length &&
    !stats.server.errors.length
  ) {
    logger.done("Aplication compiled successfully");
    logger.log(
      `Access it in ${envs.PROTOCOL}://${envs.HOST}:${envs.PORT} or ${envs.PROTOCOL}://${ip.address()}:${envs.PORT}\n`
    );
  }

  const serverMessages = formatWebpackMessages(stats.server);
  const clientMessages = formatWebpackMessages(stats.client);

  if (serverMessages.errors.length || clientMessages.errors.length) {
    logger.error("Failed to compile.\n");
    serverMessages.errors.forEach((e) => logger.log(`${e.message || e}\n`));
    clientMessages.errors.forEach((e) => logger.log(`${e.message || e}\n`));
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
}

function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    printErrors("Failed to compile.", [e], verbose);
    process.exit(1);
  }
  return compiler;
}

function main(port = 300) {
  if (!measure && !verbose) clearConsole();
  logger.start("Compiling...");
  fs.emptyDirSync(serverConfig.output.path);

  const clientCompiler = compile(smp.wrap(clientConfig));
  const serverCompiler = compile(smp.wrap(serverConfig));

  let watching = null;
  const finished = { client: false, server: false };

  function beforeRun(compiler) {
    finished[compiler.name] = false;
    delete stats[compiler.name];
  }

  function done(cb) {
    return async (st) => {
      stats = { ...stats, [st.compilation.compiler.name]: { ...st.toJson({}, true) } };

      finished[st.compilation.compiler.name] = true;
      if (finished.client && finished.server && st.compilation.compiler.name !== "client") log();
      if (cb) cb();
    };
  }

  clientCompiler.hooks.watchRun.tap("watchRun", beforeRun);
  serverCompiler.hooks.watchRun.tap("watchRun", beforeRun);

  clientCompiler.hooks.done.tap(
    "done",
    done(() => {
      if (watching) return;

      watching = serverCompiler.watch(
        {
          quiet: true,
          stats: "none",
        },
        () => {} // eslint-disable-line @typescript-eslint/no-empty-function
      );
    })
  );
  serverCompiler.hooks.done.tap("done", done());

  const clientDevServer = new SilentDevServer(clientCompiler, { ...clientConfig.devServer, verbose });

  clientDevServer.listen(envs.DEV_PORT || port, (err) => {
    if (err) {
      logger.error(err);
    }
  });

  ["SIGINT", "SIGTERM"].forEach((sig) => {
    process.on(sig, async () => {
      await serverCompiler.TunnelServerWebpackPlugin.watchClose();
      await watching.close();
      await clientDevServer.close();
      process.exit();
    });
  });
}

setPorts()
  .then(main)
  // eslint-disable-next-line no-console
  .catch(console.error);
