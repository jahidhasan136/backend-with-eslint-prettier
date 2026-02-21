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
      // Prettier formatting as ESLint errors
      'prettier/prettier': 'error',
      // Safe core JS rule
      'prefer-const': 'error',
      // Backend-friendly (warn only)
      'no-console': 'warn',
      // TypeScript projects should not use no-undef
      'no-undef': 'off',
      // Use TS-aware version to avoid conflicts/false positives
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      // Use TS-aware version for unused vars (prevents duplicate warnings later)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Turn off ESLint rules that conflict with Prettier
  prettierConfig,
];
