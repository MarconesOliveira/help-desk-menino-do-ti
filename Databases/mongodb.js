import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const db_name = process.env.MONGO_DB_NAME;

const uri = `mongodb://${host}:${port}/${db_name}`;

try {
    await mongoose.connect(uri);
} catch (error) {
    console.log("Unable to connect to MongoDB.");
    console.log(error);
}

export default mongoose;
