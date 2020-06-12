const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint", "import-helpers", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
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
    "prettier/prettier": "error",
    "no-param-reassign": "off",
    "no-useless-constructor": "off",
    "max-classes-per-file": ["error", 4],
    "class-methods-use-this": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-cycle": ["error", { maxDepth: 1 }],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: ["/^react/", "module", "/^@\\//", ["parent", "sibling", "index"]],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
    "react/button-has-type": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/label-has-for": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx", ".scss"],
    "import/resolver": {
      typescript: {},
    },
  },
};
