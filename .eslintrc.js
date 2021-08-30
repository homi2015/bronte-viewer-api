var path = require('path');

module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "jest": true
  },
  "plugins": [
    "redux-saga"
  ],
  "rules": {
    "linebreak-style": 0,
    "class-methods-use-this": 0,
    "function-paren-newline": [2, "consistent"],
    // 100 -> 110
    "max-len": [2, 110, 2, {
      "ignoreUrls": true,
      "ignoreComments": false,
      "ignoreRegExpLiterals": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
    }],
    "no-multi-assign": 0,
    "no-param-reassign": [2, { "props": false }],
    "no-plusplus": 0,
    "no-restricted-syntax": [2, "ForInStatement", "LabeledStatement", "WithStatement"],
    "no-underscore-dangle": 0,
    "no-use-before-define": [2, { "functions": false }],
    "object-curly-newline": [2, {
      ObjectExpression: { minProperties: 5, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 5, multiline: true, consistent: true },
      ImportDeclaration: { multiline: true, consistent: true }, // Removed minProperties
      ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
    }],
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "redux-saga/no-yield-in-race": 2,
    "redux-saga/yield-effects": 2,
    "require-yield": 0
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [path.resolve(__dirname, "src")]
      }
    }
  }
};
