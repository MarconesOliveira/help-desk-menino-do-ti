//Libraries used
import Express from "express";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

//Initial Setup
dotenv.config();
const app = Express();
//Bodyparser for requests with data
app.use(Express.urlencoded({ extended: false }));
//Read JSON body
app.use(Express.json());



//Call an environment variable
const port = process.env.AUTH_PORT;
//Turn on the app
app.listen(port, () => (console.log("App running at port " + port)));