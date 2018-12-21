module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  //"extends": "eslint:recommended",
  "parserOptions": {
    //"ecmaVersion": 2018,
    //"sourceType": "module"
    "parser": 'babel-eslint'
  },
  "rules": {
    "indent": [
      "error",
      "tab"
    ],
    /* "linebreak-style": [
       "error",
       "windows"
     ],*/
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'eol-last': 0,
    'space-before-function-paren': 0
  }
};