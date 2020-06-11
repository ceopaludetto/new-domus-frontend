const { defaults: tsjPreset } = require("ts-jest/presets");

const babelConfig = require("./babel.config");
const { compilerOptions } = require("./tsconfig");

module.exports = (isServer = false, collectCoverage = false) => {
  return {
    testEnvironment: isServer ? "node" : "jsdom",
    transform: {
      ...tsjPreset.transform,
    },
    moduleFileExtensions: ["js", "jsx", "json", "gql", "graphql", "ts", "tsx"],
    moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1", "\\.scss$": "identity-obj-proxy" },
    globals: {
      "ts-jest": {
        babelConfig: () => babelConfig(isServer, true),
        tsconfig: {
          ...compilerOptions,
          jsx: "react",
          target: "ES2019",
        },
      },
    },
    testMatch: ["<rootDir>/src/**/__tests__/**/*.[jt]s?(x)", "<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
    collectCoverage,
    collectCoverageFrom: ["**/*.{ts,tsx}"],
    coverageDirectory: "<rootDir>/coverage",
  };
};
