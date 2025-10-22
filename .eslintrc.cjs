module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'next/core-web-vitals',
    "next/typescript",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
      'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
      'plugin:react/jsx-runtime',
    //'plugin:react-hooks/recommended',
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'next.config.mjs', 'amplify/**', 'node_modules/**', 'public/**', 'out/**', 'coverage/**', 'build/**', 'dist/**'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "prettier", "@typescript-eslint","unused-imports"],
  rules: {
     "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "unused-imports/no-unused-vars": [
      "error",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    // 'react-refresh/only-export-components': [
    //   'warn',
    //   { allowConstantExport: true },
    // ],
    "react-refresh/only-export-components": 'error',
    "react/jsx-filename-extension": "off",
    "no-param-reassign": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/no-array-index-key": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "import/order": "off",
    "no-console": "off",
    "no-shadow": "off",
    "@typescript-eslint/naming-convention": "off",
    "import/no-cycle": "off",
    "prefer-destructuring": "off",
    "import/no-extraneous-dependencies": "off",
    "react/display-name": "off",
    "import/no-unresolved": ["off", { "caseSensitive": false }],
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@mui/*/*/*", "!@mui/material/test-utils/*"]
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      // {
      //   "vars": "all",
      //   "args": "after-used"
      // }
    ],
    "prettier/prettier": [
      "error",
      {
        "bracketSpacing": true,
        "printWidth": 140,
        "singleQuote": true,
        "trailingComma": "none",
        "tabWidth": 2,
        "useTabs": false,
        "endOfLine": "auto"
      }
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    createDefaultProgram: true
  },
  settings: {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src/"]
      },
      "typescript": {
        "alwaysTryTypes": true
      }
    }
  }
}
