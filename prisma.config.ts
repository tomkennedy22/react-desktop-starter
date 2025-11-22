import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'src/backend/db/schema.prisma',
  migrations: {
    path: 'src/backend/db/migrations',
  },
  datasource: {
    url: 'file:./src/backend/db/databases/template.db',
  },
})