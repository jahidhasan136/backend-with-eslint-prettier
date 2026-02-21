# ESLint + Prettier Setup (TypeScript + Node)

0) Install Dependencies

```bash
npm i -D eslint @eslint/js typescript-eslint eslint-config-prettier eslint-plugin-prettier prettier

npm i -D globals
```

1) Create: eslint.config.js

```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
  // Ignore build output
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (works with flat config)
  ...tseslint.configs.recommended,

  // Your project rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
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
```

2) Create: .prettierrc.json

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all",
  "tabWidth": 2
}
```

3) Create: .prettierignore

```txt
dist
node_modules
```

4) Update: package.json

```json
"scripts": {
  "build": "tsc",
  "start": "node ./dist/server.js",
  "dev": "node --watch ./dist/server.js",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier . --write",
  "format:check": "prettier . --check",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

5) Run command

```bash
npm run lint

npm run lint:fix

npm run format
```

6) Recommanded-Create: .editorconfig

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

7) .gitignore

```txt
.env
dist
node_modules
```
