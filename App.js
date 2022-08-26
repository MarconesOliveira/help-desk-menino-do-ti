//Libraries used
import Express from "express";
import dotenv from "dotenv";
import path from "path";
import * as swaggerUi from "swagger-ui-express";
import swaggerConfig from "./docs/swaggerConfig.js";
//Routes created
import router from "./Routes/Routes.js";
import * as currentPath from "./utils/currentPath.cjs";

//Path resolving
const __dirname = (path.normalize(`${currentPath.default}/../`));

//Initial Setup
dotenv.config();
const App = Express();
//Bodyparser for requests with data
App.use(Express.urlencoded({ extended: false }));
//Read JSON body
App.use(Express.json());
//Static files
App.use(Express.static("Public"));
//User the local router
App.use(router);
//SwaggerUI for documentation
App.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
//If no one of the router endpoints is hit send a 404
App.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname + "Views/404.html"));
});

export default App;
