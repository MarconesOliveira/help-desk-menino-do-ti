import Express from "express";
import * as FrontController from "../FrontController/FrontController.js";
const router = Express.Router();

//Routes available
router.get("/", (req, res) => FrontController.getAllTickets(req, res));

export default router;