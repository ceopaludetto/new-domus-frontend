process.env.NODE_ENV = "test";
process.env.BABEL_ENV = "test";
process.noDeprecation = true;

process.on("unhandledRejection", (err) => {
  throw err;
});

const jest = require("jest");

const target = process.env.TARGET || "server";

const argv = process.argv.slice(2);

argv.push("--config", JSON.stringify(require("../jest.config")(target === "server")));

jest.run(argv);
