import js from '@eslint/js'
import globals from 'globals'

// Only root-level tooling config lands here; each package's own
// eslint.config.mjs is closer to its files and takes precedence.
export default [
  { ignores: ['tekblogg-web/', 'tekblogg-cms/'] },
  js.configs.recommended,
  { languageOptions: { globals: globals.node } }
]
