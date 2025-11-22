import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'src/backend/db/schema.prisma',
  migrations: {
    path: 'src/backend/db/migrations',
  },
  datasource: {
    url: 'file:./node_modules/electron/dist/Electron.app/Contents/Resources/template.db',
  },
})