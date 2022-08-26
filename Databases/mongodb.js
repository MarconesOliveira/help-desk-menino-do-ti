import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const db_name = process.env.MONGO_DB_NAME;

//Dev
const uri = `mongodb://${host}:${port}/${db_name}`;
//Production
const atlas = process.env.ATLAS_URI;
//If environment variable USE_TEST_DATABASE exists and it's set to true use the Dev database
const selectedDatabase = (process.env.USE_TEST_DATABASE) ? uri : atlas ;

try {
    mongoose.connect(selectedDatabase);
} catch (error) {
    console.log("Unable to connect to MongoDB.");
    console.log(error);
}

export default mongoose;
