import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from 'globals';
import reactRefresh from "eslint-plugin-react-refresh";
import eslintReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import pluginImportX from "eslint-plugin-import-x";
import tsParser from "@typescript-eslint/parser";
import jsxAlly from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";

/** @type {import('eslint').Linter.Config} */
export default tseslint.config(
  { ignores: ["dist/**/*.ts", "dist/**", "**/*.js", "node_modules"] },
    {    
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintReact.configs.flat.recommended,
      pluginImportX.flatConfigs.recommended,
      jsxAlly.flatConfigs.recommended,
    ],
    },
    {
      files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
      languageOptions: {
        globals: globals.browser,
        parser: tsParser,
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        'import-x/no-dynamic-require': 'warn',
        'import-x/no-nodejs-modules': 'warn',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
    },
    {
      plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
        'simple-import-sort': simpleImportSort,
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
        'react/prefer-stateless-function': 'error',
        //'react/button-has-type': 'error',
        'react/no-unused-prop-types': 'error',
        'react/jsx-pascal-case': 'error',
        'react/jsx-no-script-url': 'error',
        'react/no-children-prop': 'error',
        'react/no-danger': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
        'react/jsx-fragments': 'error',
        'react/destructuring-assignment': [
          'error',
          'always',
          { destructureInSignature: 'always' },
        ],
        'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
        'react/jsx-max-depth': ['error', { max: 5 }],
        'react/function-component-definition': [
          'warn',
          { namedComponents: 'arrow-function' },
        ],
        'react/jsx-key': [
          'error',
          {
            checkFragmentShorthand: true,
            checkKeyMustBeforeSpread: true,
            warnOnDuplicates: true,
          },
        ],
        'react/jsx-no-useless-fragment': 'warn',
        'react/jsx-curly-brace-presence': 'warn',
        'react/no-typos': 'warn',
        'react/display-name': 'warn',
        'react/self-closing-comp': 'warn',
        'react/jsx-sort-props': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-one-expression-per-line': 'off',
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
          'error',
          { assertionStyle: 'never' },
        ],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
      },
);
