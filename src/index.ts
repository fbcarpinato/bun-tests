import express from 'express';

const app = express();

app.get('/', (request: express.Request, response: express.Response) => {
    response.json({
        data: "Hello World 1"
    })
})

app.listen(3000, () => {
    console.log('Listening to port 3000');
});