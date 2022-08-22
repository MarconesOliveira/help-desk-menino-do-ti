//Libraries used
import Express from "express";
import dotenv from "dotenv";
import * as swaggerUi from "swagger-ui-express";
import swaggerConfig from "./docs/swaggerConfig.js";
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
//SwaggerUI for documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
//If no one of the router endpoints is hit send a 404
app.use((req, res) => {
    res.status(404).json({"msg":"Endpoint not found."});
});

//Call an environment variable
const port = process.env.PORT || 3000;
//Turn on the app
app.listen(port, () => (console.log("App running at port " + port)));
