const path = require("path");

const rules = {
  // Prettier for autofix
  "prettier/prettier": "error",
  // Some logic need reassign (such sequelize hooks)
  "no-param-reassign": "off",
  // Allow for of
  "no-restricted-syntax": "off",
  // Import ordering and allow no default
  "import/prefer-default-export": "off",
  "import/no-extraneous-dependencies": "off",
  "import-helpers/order-imports": [
    "warn",
    {
      newlinesBetween: "always",
      groups: ["/^react/", "module", "/^@\\//", ["parent", "sibling", "index"]],
      alphabetize: { order: "asc", ignoreCase: true },
    },
  ],
  "import/extensions": "off",
  "import/no-import-module-exports": "off",
};

module.exports = {
  env: {
    node: true,
  },
  extends: ["prettier"],
  plugins: ["import-helpers", "prettier"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules,
  overrides: [
    {
      files: ["src/**/*.ts", "src/**/*.tsx", "mikro-orm.config.ts"],
      env: {
        node: true,
        browser: true,
        jest: true,
      },
      extends: ["airbnb", "airbnb-typescript", "airbnb/hooks", "prettier"],
      plugins: ["@typescript-eslint", "import-helpers", "prettier"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
        ecmaVersion: 2021,
        sourceType: "module",
        project: path.resolve("tsconfig.json"),
      },
      rules: {
        ...rules,
        // Use inference of type
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        // Allow any in some logic
        "@typescript-eslint/no-explicit-any": "off",
        // Some rules that causes some issues
        "react/button-has-type": "off",
        "react/require-default-props": "off",
        "react/prop-types": "off",
        "react/jsx-props-no-spreading": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/label-has-for": "off",
      },
    },
    {
      files: ["./**/*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      },
    },
  ],
};
