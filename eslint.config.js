import { defineEslintConfig } from '@subframe7536/eslint-config'

export default defineEslintConfig({
  ignores: ['./packages/sqlite-builder/README.md'],
  overrideRules: {
    'prefer-template': 'off',
  },
  vue: true,
})
