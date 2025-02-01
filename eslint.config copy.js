import js from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintReactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import sort from 'eslint-plugin-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  sort.configs['flat/recommended'],
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
      react: eslintReactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-expressions': 'off',
      'padding-line-between-statements': [
        'error',

        // After directives (like 'use-strict'), except between directives
        { blankLine: 'always', next: '*', prev: 'directive' },
        { blankLine: 'any', next: 'directive', prev: 'directive' },

        // After imports, except between imports
        { blankLine: 'always', next: '*', prev: 'import' },
        { blankLine: 'any', next: 'import', prev: 'import' },

        // Before and after every sequence of variable declarations
        { blankLine: 'always', next: ['const', 'let', 'var'], prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },

        // Before and after class declaration, if, while, switch, try
        {
          blankLine: 'always',
          next: ['class', 'if', 'while', 'switch', 'try'],
          prev: '*',
        },
        {
          blankLine: 'always',
          next: '*',
          prev: ['class', 'if', 'while', 'switch', 'try'],
        },

        // Before return statements
        { blankLine: 'always', next: 'return', prev: '*' },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
