//Libraries used
import Express from "express";
import dotenv from "dotenv";
//Routes created
import router from "./Routes/Routes.js";

//Initial Setup
dotenv.config();
const app = Express();
//Bodyparser for requests with data
app.use(Express.urlencoded({ extended: false }));
//Read JSON body
app.use(Express.json());
//User the local router
app.use(router);

//Call an environment variable
const port = process.env.API_PORT;
//Turn on the app
app.listen(port, () => (console.log("App running at port " + port)));