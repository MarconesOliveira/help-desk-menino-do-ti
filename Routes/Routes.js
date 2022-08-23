import Express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import * as FrontController from "../Controllers/FrontController.js";
import { validateToken } from "../utils/jwt.js";
const router = Express.Router();

//Path resolving
let __dirname = path.dirname(fileURLToPath(import.meta.url));
__dirname = path.normalize(`${__dirname}/../`)

//Generic greeting.
router.get("/", (req, res) => (res.status(200).sendFile(path.join(__dirname + "Views/home.html"))));

//Register
router.get("/register", (req, res) => (res.status(200).sendFile(path.join(__dirname + "Views/register.html"))));

//Login routes
router.post("/login", (req, res) => FrontController.userLogin(req, res));
router.get("/login", (req, res) => (res.status(200).sendFile(path.join(__dirname + "Views/login.html"))));

//Routes to get all instances of any entity.
router.get("/all_tickets", (req, res) => FrontController.getAllTickets(req, res));
router.get("/all_users", (req, res) => FrontController.getAllUsers(req, res));
router.get("/all_departments", (req, res) => FrontController.getAllDepartments(req, res));

//Routes to create new instances of an entity.
router.post("/ticket", (req, res) => FrontController.addTicket(req, res));
router.post("/user", (req, res) => FrontController.addUser(req, res));
router.post("/department", (req, res) => FrontController.addDepartment(req, res));

//Routes to get a specific instance of an entity.
router.get("/ticket/:code", (req, res) => FrontController.getTicket(req, res));
router.get("/user/:employeeID", (req, res) => FrontController.getUser(req, res));
router.get("/department/:code", (req, res) => FrontController.getDepartment(req, res));

//Routes to update an instance of any entity.
router.put("/ticket/:code", validateToken, (req, res) => FrontController.updateTicket(req, res));
router.put("/user", validateToken, (req, res) => FrontController.updateUser(req, res));
router.put("/department/:code", validateToken, (req, res) => FrontController.updateDepartment(req, res));

//Routes to delete instances of any entity.
router.delete("/ticket/:code", validateToken, (req, res) => FrontController.deleteTicket(req, res));
router.delete("/user", validateToken, (req, res) => FrontController.deleteUser(req, res));
router.delete("/department/:code", validateToken, (req, res) => FrontController.deleteDepartment(req, res));

export default router;
