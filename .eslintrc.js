const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended", "prettier", "prettier/@typescript-eslint"],
  plugins: ["import", "import-helpers", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    projects: [path.resolve("tsconfig.json")]
  },
  rules: {
    "prettier/prettier": "error",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "no-useless-constructor": "off",
    "max-classes-per-file": ["error", 5],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-cycle": ["error", { maxDepth: 1 }],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: ["/^react/", "module", "/^~\\//", ["parent", "sibling", "index"]],
        alphabetize: { order: "asc", ignoreCase: true }
      }
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ]
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/extensions": [".js", ".ts"],
    "import/resolver": {
      typescript: {}
    }
  }
};
