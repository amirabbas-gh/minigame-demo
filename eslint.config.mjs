import path from "path";
import { fileURLToPath } from "url";
import globals from "globals";
import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compatWithRecommended = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
export default defineConfig([
  globalIgnores([
    ".DS_Store",
    ".vscode/c_cpp_properties.json",
    "node_modules/",
    "package-lock.json",
    "node_modules",
    "dist",
    "libs",
    "*.js",
  ]),
  {
    extends: compatWithRecommended.extends("plugin:prettier/recommended"),
    languageOptions: {
      globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        wx: "readonly",
        canvas: "readonly",
        require: "readonly",
        module: "readonly",
        worker: "readonly",
        exports: "readonly",
        GameGlobal: "readonly",
        requirePlugin: "readonly",
        ...globals.browser,
        ...globals.es6,
      },
      parserOptions: {
        ecmaVersion: 2018,
      },
      sourceType: "module",
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
]);
