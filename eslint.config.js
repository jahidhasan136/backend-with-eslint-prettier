import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Ignore build output
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (works with flat config)
  ...tseslint.configs.recommended,

  // Your project rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Make Prettier show as ESLint errors
      'prettier/prettier': 'error',
    },
  },

  // Turn off ESLint rules that conflict with Prettier
  prettierConfig,
];
