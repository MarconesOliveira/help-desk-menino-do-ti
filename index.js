//Libraries used
import Express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import * as swaggerUi from "swagger-ui-express";
import swaggerConfig from "./docs/swaggerConfig.js";
//Routes created
import router from "./Routes/Routes.js";

//Path resolving
let __dirname = path.dirname(fileURLToPath(import.meta.url));
__dirname = path.normalize(`${__dirname}/`);

//Initial Setup
dotenv.config();
const app = Express();
//Bodyparser for requests with data
app.use(Express.urlencoded({ extended: false }));
//Read JSON body
app.use(Express.json());
//Static files
app.use(Express.static("Public"));
//User the local router
app.use(router);
//SwaggerUI for documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
//If no one of the router endpoints is hit send a 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname + "Views/404.html"));
});

//Call an environment variable
const port = process.env.PORT || 3000;
//Turn on the app
app.listen(port, () => (console.log("App running at port " + port)));
