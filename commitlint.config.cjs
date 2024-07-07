const execSync = require('node:child_process').execSync

const issue = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()
  .split('_')[1]
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rule: {
  },
  prompt: {
    path: 'cz-git',
    scopes: [
      'plugin',
      'dialect-tauri',
      'dialect-wasm',
      'dialect-bun-worker',
      'dialect-sqlite-worker',
      'dialect-wasqlite-worker',
      // 'builder',
      'workspace',
      // 'utils',
    ],
    markBreakingChangeMode: true,
    allowBreakingChanges: [
      'feat',
      'fix',
      'chore',
    ],
    issuePrefixes: [
      {
        value: 'closed',
        name: 'closed:   ISSUES has been processed',
      },
    ],
    customIssuePrefixAlign: !issue ? 'top' : 'bottom',
    defaultIssues: !issue ? '' : `#${issue}`,
    confirmColorize: true,
    minSubjectLength: 0,
    defaultBody: '',
    defaultScope: '',
    defaultSubject: '',
  },
}
