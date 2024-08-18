import { defineEslintConfig } from '@subframe7536/eslint-config'

export default defineEslintConfig({
  overrideRules: {
    'prefer-template': 'off',
  },
  vue: true,
  ignoreAll: ['./packages/sqlite-*/**/*.ts'],
  ignoreRuleOnFile: [
    {
      files: './playground/**/*.{ts,vue}',
      rules: ['ts/explicit-function-return-type'],
    },
  ],
})
