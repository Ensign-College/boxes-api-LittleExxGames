const redis = require('redis');
const host = 'localhost';
const port = 6379;
const redisClient = redis.createClient({
    url: `redis://${host}:${port}`
});

const express = require('express');
const cors = require('cors');

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();
const app = express();

const options = {
    origin: 'http://localhost:3000'
};

app.use(cors(options));
app.use(express.json());

// Handle errors (optional) 
redisClient.on('error', err => {
    console.log('Redis Client Error', err);
});



main().catch(console.error);

app.get('/', (req, res) => {
    res.send('Hello World!')
});



app.post('/shoes', async (req, res) => {

    const shoeData = {
        shoeId: 100,
        brand: "Nike",
        model: "Air Max",
        size: 9
    };
    const shoey = await redisClient.json.set(`shoe:100`, '.', shoeData);
    res.json(shoey)
});

app.listen(3001, () => {
    console.log(`Example app listening on port ${3001}`);
});