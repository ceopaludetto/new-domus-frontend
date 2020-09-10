const path = require("path");
const { defaults: tsjPreset } = require("ts-jest/presets");

const { compilerOptions } = require("./tsconfig");

const common = {
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  moduleFileExtensions: ["js", "jsx", "json", "graphql", "ts", "tsx"],
  transformIgnorePatterns: ["/node_modules/"],
  transform: tsjPreset.transform,
  moduleNameMapper: {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testURL: "http://localhost/",
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  coverageDirectory: "<rootDir>/coverage",
  globals: {
    "ts-jest": {
      babelConfig: path.resolve("babel.config.js"),
      tsconfig: compilerOptions,
    },
  },
};

module.exports = {
  projects: [
    {
      displayName: "server",
      testEnvironment: "node",
      testMatch: [
        "<rootDir>/src/server/**/__tests__/**/*.[jt]s?(x)",
        "<rootDir>/src/server/**/?(*.)+(spec|test).[jt]s?(x)",
      ],
      ...common,
    },
    {
      displayName: "client",
      testEnvironment: "jsdom",
      testMatch: [
        "<rootDir>/src/client/**/__tests__/**/*.[jt]s?(x)",
        "<rootDir>/src/client/**/?(*.)+(spec|test).[jt]s?(x)",
      ],
      ...common,
    },
  ],
};
