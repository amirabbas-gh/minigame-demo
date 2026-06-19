import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import path from 'node:path';

/** @type {import('eslint').Linter.RulesRecord} */
export const minicodeRules = {
  curly: 'error',
  'no-plusplus': 'off',
  'no-undef': 'off',
  'no-empty': 'off',
  'no-debugger': 'error',
  'no-param-reassign': 'off',
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-require-imports': 'off',
  '@typescript-eslint/prefer-optional-chain': 'off',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-empty-function': 'off',
  // v8 recommended adds stricter checks not present in the prior @typescript-eslint v7 setup.
  '@typescript-eslint/no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
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
    {
      selector: 'function',
      format: ['camelCase', 'PascalCase'],
    },
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'snake_case'],
    },
    {
      selector: 'variable',
      modifiers: ['global'],
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
    },
    {
      selector: 'variable',
      format: ['camelCase', 'PascalCase'],
      types: ['function'],
    },
    {
      selector: 'variable',
      modifiers: ['exported'],
      format: ['UPPER_CASE'],
      types: ['boolean', 'string', 'number', 'array'],
    },
    {
      selector: 'variable',
      modifiers: ['exported'],
      format: ['camelCase', 'PascalCase'],
      types: ['function'],
    },
    {
      selector: ['class', 'typeLike'],
      format: ['PascalCase'],
    },
    {
      selector: ['classMethod', 'classProperty'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
      format: ['camelCase', 'snake_case'],
    },
  ],
  'implicit-arrow-linebreak': 'off',
  'operator-linebreak': 'off',
  'require-await': 'error',
  'no-return-await': 'error',
};

/**
 * @param {string} configDir Absolute path to the minicode package directory.
 * @param {string | string[]} files Glob(s) relative to configDir.
 */
export function createMinicodeConfig(configDir, files = '**/*.ts') {
  const filePatterns = Array.isArray(files) ? files : [files];

  return tseslint.config(
    {
      ignores: ['node_modules/**', 'dist/**', 'eslint.config.mjs'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierRecommended,
    {
      files: filePatterns,
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.jest,
        },
        parserOptions: {
          project: path.join(configDir, 'tsconfig.json'),
          tsconfigRootDir: configDir,
        },
      },
      rules: minicodeRules,
    },
  );
}
