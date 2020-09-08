/* eslint-disable global-require */

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  sass: {
    dev: {
      sourceMap: true,
      implementation: require("sass"),
    },
    prod: {
      sourceMap: true,
      implementation: require("sass"),
    },
  },
  css: {
    dev: {
      sourceMap: true,
      importLoaders: 2,
      modules: {
        auto: true,
        localIdentName: "[name]__[local]___[hash:base64:5]",
      },
    },
    prod: {
      sourceMap: false,
      importLoaders: 2,
      modules: {
        auto: true,
        localIdentName: "_[hash:base64:5]",
      },
    },
  },
  postcss: {
    dev: {
      sourceMap: true,
      ident: "postcss",
    },
    prod: {
      sourceMap: false,
      ident: "postcss",
    },
    plugins: [
      require("postcss-flexbugs-fixes"),
      require("postcss-preset-env")({
        autoprefixer: {
          flexbox: "no-2009",
        },
        features: {
          "prefers-color-scheme-query": false,
        },
        stage: 1,
      }),
      isProd &&
        require("@fullhuman/postcss-purgecss")({
          content: ["./src/**/*.tsx"],
          keyframes: true,
          fontFace: true,
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        }),
      require("postcss-normalize"),
    ].filter(Boolean),
  },
};
