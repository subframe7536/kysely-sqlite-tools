import { subfLint } from '@subf/config/oxlint'

export default subfLint({
  lib: true,
  ignorePatterns: ['playground/**'],
  rules: {
    'class-methods-use-this': 'off',
  },
})
