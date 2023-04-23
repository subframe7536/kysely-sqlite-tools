import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: [
    'kysely',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
