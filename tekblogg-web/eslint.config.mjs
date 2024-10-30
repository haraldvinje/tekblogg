import globals from 'globals'
import pluginJs from '@eslint/js'
import tailwindcss from 'eslint-plugin-tailwindcss'
import importPlugin from 'eslint-plugin-import'
import noRelativeImportsPlugin from 'eslint-plugin-no-relative-import-paths'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import { fixupConfigRules } from '@eslint/compat'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    plugins: {
      tailwindcss,
      import: importPlugin,
      'no-relative-import-paths': noRelativeImportsPlugin
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'react/react-in-jsx-scope': 'off',
      'tailwindcss/classnames-order': [
        'warn',
        {
          officialSorting: true
        }
      ],
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          whitelist: ['fa-.+']
        }
      ],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object']
        }
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {
          allowSameFolder: true
        }
      ]
    }
  }
]
