/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const commonOptions = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["<rootDir>/src/__test__/setup.ts"],
  preset: "ts-jest",
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  projects: [
    {
      displayName: "CLIENT",
      testEnvironment: "jsdom",
      testMatch: ["**/__tests__/**/*.[jt]s?(x)", "<rootDir>/src/client/**/?(*.)+(spec|test).[jt]s?(x)"],
      collectCoverageFrom: ["<rootDir>/src/client/**"],
      ...commonOptions,
    },
    {
      displayName: "SERVER",
      testEnvironment: "jsdom",
      testMatch: ["**/__tests__/**/*.[jt]s?(x)", "<rootDir>/src/server/**/?(*.)+(spec|test).[jt]s?(x)"],
      collectCoverageFrom: ["<rootDir>/src/server/**"],
      ...commonOptions,
    },
  ],
};
