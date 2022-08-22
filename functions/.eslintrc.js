module.exports = {
  parser: "babel-eslint",
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "linebreak-style": 0,
    "require-jsdoc": 0,
    "max-len": "off",
  },
};
