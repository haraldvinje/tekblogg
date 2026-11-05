import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import importX from 'eslint-plugin-import-x'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import hooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const eslintConfig = [
  { ignores: ['.next/', 'out/', 'build/', 'coverage/', 'public/', 'next-env.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts}'],
    plugins: {
      '@next/next': nextPlugin,
      'react-hooks': hooksPlugin,
      'import-x': importX
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...hooksPlugin.configs.recommended.rules,
      'react-hooks/incompatible-library': 'off',
      'preserve-caught-error': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'import-x/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object']
        }
      ]
    }
  },
  {
    // lint-staged runs ESLint from the workspace root; without this, Next's
    // rules look for a pages/ directory there instead of in this package.
    settings: {
      next: {
        rootDir: import.meta.dirname
      }
    }
  }
]

export default eslintConfig
