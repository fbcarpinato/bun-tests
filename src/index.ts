import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.get('/', async (request: express.Request, response: express.Response) => {
    const usersCount = await prisma.user.count();
    response.json({
        data: {users: usersCount}
    })
})

app.listen(3000, () => {
    console.log('Listening to port 3000');
});