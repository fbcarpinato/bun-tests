import express from 'express'
import { PrismaClient } from '@prisma/client'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'

const prisma = new PrismaClient()

const app = express()

app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < 400
    }
  })
)

app.use(
  morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, '../data/access.log'), {
      flags: 'a'
    })
  })
)

app.use(cors())

app.use(compression())

app.use(helmet())

app.get('/', async (request: express.Request, response: express.Response) => {
  const usersCount = await prisma.user.count()
  response.json({
    data: { users: usersCount }
  })
})

app.listen(3000, () => {
  console.log('Listening to port 3000')
})
