import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';
import { createMinicodeConfig } from './eslint.minicode.mjs';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

const minigameGlobals = {
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
};

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'libs/**', '**/*.js'],
  },
  js.configs.recommended,
  prettierRecommended,
  {
    files: ['miniprogram/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...minigameGlobals,
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  ...createMinicodeConfig(
    path.join(repoRoot, 'minicode/getUserInfo'),
    'minicode/getUserInfo/**/*.ts',
  ),
  ...createMinicodeConfig(
    path.join(repoRoot, 'minicode/requestSubscribeSystemMessage'),
    'minicode/requestSubscribeSystemMessage/**/*.ts',
  ),
];
