const { defaults: tsjPreset } = require("ts-jest/presets");
const { pathsToModuleNameMapper } = require("ts-jest/utils");

const babelConfig = require("./babel.config");
const { compilerOptions } = require("./tsconfig");

module.exports = (isServer = false) => {
  return {
    testEnvironment: isServer ? "node" : "jsdom",
    transform: {
      ...tsjPreset.transform
    },
    moduleFileExtensions: ["js", "jsx", "json", "gql", "graphql", "ts", "tsx"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    globals: {
      "ts-jest": {
        babelConfig: () => babelConfig(isServer, true)
      }
    },
    testMatch: ["<rootDir>/src/**/__tests__/**/*.[jt]s?(x)", "<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"]
  };
};
