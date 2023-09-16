import express from 'express'
import { PrismaClient } from '@prisma/client'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const app = express()

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../data/access.log'),
  { flags: 'a' }
)
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', async (request: express.Request, response: express.Response) => {
  const usersCount = await prisma.user.count()
  response.json({
    data: { users: usersCount }
  })
})

app.listen(3000, () => {
  console.log('Listening to port 3000')
})
