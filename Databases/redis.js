import { createClient } from 'redis';

const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;

const redisClient = createClient({
    url:`redis://${host}:${port}`
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();

export default redisClient;
