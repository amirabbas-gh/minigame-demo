'use strict';

const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'eslint.config.js'],
  },
  js.configs.recommended,
  // Spreads: base (plugin + parser), eslint-recommended overrides, recommended TS rules
  ...tsPlugin.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      curly: 'error',
      'no-plusplus': 'off',
      'no-undef': 'off',
      'no-empty': 'off',
      'no-debugger': 'error',
      'no-param-reassign': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      'max-len': [
        'error',
        {
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        // functions: camelCase or PascalCase (for React components)
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // local variables: camelCase, UPPER_CASE, or snake_case
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'snake_case'],
        },
        // global variables: any casing to accommodate various libraries
        {
          selector: 'variable',
          modifiers: ['global'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        // function-typed variables: camelCase or PascalCase
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase'],
          types: ['function'],
        },
        // exported booleans, strings, numbers, arrays: UPPER_CASE
        {
          selector: 'variable',
          modifiers: ['exported'],
          format: ['UPPER_CASE'],
          types: ['boolean', 'string', 'number', 'array'],
        },
        // exported function variables: camelCase or PascalCase
        {
          selector: 'variable',
          modifiers: ['exported'],
          format: ['camelCase', 'PascalCase'],
          types: ['function'],
        },
        // classes and type aliases: PascalCase
        {
          selector: ['class', 'typeLike'],
          format: ['PascalCase'],
        },
        // class members: camelCase or snake_case, no leading/trailing underscores
        {
          selector: ['classMethod', 'classProperty'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
          format: ['camelCase', 'snake_case'],
        },
      ],
      'implicit-arrow-linebreak': 0,
      'operator-linebreak': 0,
      'require-await': 'error',
      'no-return-await': 'error',
    },
  },
  prettierRecommended,
];
