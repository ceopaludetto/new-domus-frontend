const { execSync } = require("child_process");

class CodegenRunner {
  listen = false;

  constructor(watch = true) {
    this.watch = watch;
  }

  run() {
    if (!this.listen) {
      this.listen = true;
      execSync(`graphql-codegen --config codegen.yml${this.watch ? " --watch" : ""}`);
    }
  }
}

module.exports = CodegenRunner;
