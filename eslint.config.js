'use strict';

const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'libs/**', '**/*.js'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.es2015,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        wx: 'readonly',
        canvas: 'readonly',
        require: 'readonly',
        module: 'readonly',
        worker: 'readonly',
        exports: 'readonly',
        GameGlobal: 'readonly',
        requirePlugin: 'readonly',
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  prettierRecommended,
];
