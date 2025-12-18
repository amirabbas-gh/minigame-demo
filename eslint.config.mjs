import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import { defineConfig, globalIgnores } from '@eslint/config-helpers';

const cleanGlobals = (globalsObj) => {
  return Object.fromEntries(
    Object.entries(globalsObj).map(([key, value]) => [key.trim(), value])
  );
};

export default defineConfig([
  globalIgnores([
    '.DS_Store',
    '.vscode/c_cpp_properties.json',
    'node_modules/',
    'package-lock.json',
    'node_modules',
    'dist',
    'libs',
    '*.js',
  ]),
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
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
        ...cleanGlobals(globals.browser),
        ...cleanGlobals(globals.es6),
      },
      parserOptions: {
        ecmaVersion: 2018,
      },
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  eslintConfigPrettier,
]);
