import App from './App.js';
import { connectMongoDB } from './Databases/mongodb.js';
import { connectRedis } from './Databases/redis.js';

await connectMongoDB();
await connectRedis();

//Call an environment variable
const port = process.env.PORT || 3000;
//Turn on the app
App.listen(port, () => (console.log("App running at port " + port)));
