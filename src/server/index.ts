/* eslint-disable global-require */
import http from "http";

let { app } = require("./app");

const server = http.createServer(app);
let curr = app;

server.listen(process.env.PORT ?? 3333);

if (module.hot) {
  module.hot.accept("./app", () => {
    app = require("./app").app;
    server.removeListener("request", curr);
    server.on("request", app);
    curr = app;
  });
}
