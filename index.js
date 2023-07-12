const parser = require('@typescript-eslint/parser');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: process.cwd(),
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: true,
  },
  globals: {
    document: 'readonly',
    navigator: 'readonly',
    window: 'readonly',
  },
  // plugins: [
  //   'import',
  //   'n',
  //   'promise',
  // ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
    },
  },
  env: {
    es2021: true,
    node: true
  },
  rules: {
    "semi": [2, "always"],
    "quotes": [2, "single"],
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/semi": "warn",
    "curly": "warn",
    "eqeqeq": "warn",
    "no-throw-literal": "warn",
    "max-len": [
      "error",
      {
        "ignoreComments": true,
        "code": 120
      }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "quote-props": ["error", "as-needed"],
    "no-async-promise-executor": "off"
  },
  ignorePatterns: [
    "out",
    "dist",
    "assets",
    "bin",
    "config"
  ]
}
