const path = require("path");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:promise/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint", "promise", "import-helpers", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
    project: path.resolve("tsconfig.json"),
  },
  rules: {
    // Prettier for autofix
    "prettier/prettier": "error",
    // Some logic need reassign (such sequelize hooks)
    "no-param-reassign": "off",
    // Allow for of
    "no-restricted-syntax": "off",
    // DI in Nest
    "no-useless-constructor": "off",
    "class-methods-use-this": "off",
    // Nest dtos
    "max-classes-per-file": ["error", 4],
    // Use inference of type
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // Allow any in some logic
    "@typescript-eslint/no-explicit-any": "off",
    // In server-side cycles are common
    "import/no-cycle": ["error", { maxDepth: 1 }],
    // Import ordering and allow no default
    "import/prefer-default-export": "off",
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: ["/^react/", "module", "/^@\\//", ["parent", "sibling", "index"]],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
    // Some rules that causes some issues
    "react/button-has-type": "off",
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/label-has-for": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ["src/server/models/*.ts"],
      rules: {
        "import/no-cycle": "off",
      },
    },
    {
      files: [
        "./configuration/**/*.js",
        "./scripts/**/*.js",
        "./src/client/utils/setup-test.tsx",
        "./database.config.js",
        "./razzle.config.js",
        "./.eslintrc.js",
      ],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      },
    },
  ],
};
