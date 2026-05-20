import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.ts'], languageOptions: { globals: globals.node } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
];
