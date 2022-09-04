import { createClient } from 'redis';
import dotenv from "dotenv";
dotenv.config();

//Dev
const urlLocalhost = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
//Production
const urlRedisCloud = `redis://${process.env.REDIS_CLOUD}`;
//If environment variable USE_TEST_DATABASE exists and it's set to true use the Dev database
const selectedDatabase = (process.env.USE_TEST_DATABASE) ? urlLocalhost : urlRedisCloud ;

const redisClient = createClient({
    url:selectedDatabase
});

export async function connectRedis() {
    redisClient.connect()
        .then(() => {
            console.log("Redis is connected.");
            redisClient.del("tickets")
                .then(() => {console.log("Cache cleared.")})
                .catch((error) => (console.log(error)));
        })
        .catch((error) => (console.log(error)));
}

export async function disconnectRedis() {
    redisClient.disconnect();
}

export default redisClient;
