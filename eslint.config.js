
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import jsxAlly from 'eslint-plugin-jsx-a11y';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jestPlugin from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import vitest from 'eslint-plugin-vitest';

/** @type {import('eslint').Linter.Config} */
export default tseslint.config(
  { ignores: ['dist/**/*.ts', 'dist/**', '**/*.js', 'node_modules'] },

      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintReact.configs.flat.recommended,

      jsxAlly.flatConfigs.recommended,
      eslintConfigPrettier,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      'jest': jestPlugin,
       vitest,
      'testing-library': testingLibrary,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'warn',
      'jest/no-identical-title': 'warn',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'warn',
      'testing-library/await-async-queries': 'warn',
      'testing-library/no-await-sync-queries': 'warn',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': 'off',
      ...vitest.configs.recommended.rules,
      'vitest/max-nested-describe': ['warn', { max: 3 }],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  },
  {
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prefer-stateless-function': 'warn',
      'react/no-unused-prop-types': 'warn',
      'react/jsx-pascal-case': 'warn',
      'react/jsx-no-script-url': 'warn',
      'react/no-children-prop': 'warn',
      'react/no-danger': 'warn',
      'react/no-danger-with-children': 'warn',
      'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
      'react/jsx-fragments': 'warn',
      'react/destructuring-assignment': [
        'warn',
        'always',
        { destructureInSignature: 'always' },
      ],
      'react/jsx-no-leaked-render': ['warn', { validStrategies: ['ternary'] }],
      'react/jsx-max-depth': ['warn', { max: 5 }],
      'react/function-component-definition': [
        'warn',
        { namedComponents: 'arrow-function' },
      ],
      'react/jsx-key': [
        'warn',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
      'react/jsx-no-useless-fragment': 'warn',
      //'react/jsx-curly-brace-presence': 'warn',
      'react/no-typos': 'warn',
      'react/display-name': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-sort-props': 'warn',
      'react/react-in-jsx-scope': 'off',
      //'react/jsx-one-expression-per-line': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'default',
          format: ['PascalCase', 'camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          // Specify PascalCase for React components
          format: ['PascalCase', 'camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'property',
          format: null,
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        { assertionStyle: 'never' },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/array-type': 'warn',
      '@typescript-eslint/member-ordering': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          "checksVoidReturn": false
        }
      ],
      "@typescript-eslint/no-base-to-string": 'off'
    },
  },
  
);