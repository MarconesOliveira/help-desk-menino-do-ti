import Express from "express";
import * as FrontController from "../FrontController/FrontController.js";
const router = Express.Router();

//Generic greeting.
router.get("/", (req, res) => (res.send("Olá, bem vindo ao Menino_do_TI!")));

//Routes to get all instances of any entity.
router.get("/all_tickets", (req, res) => FrontController.getAllTickets(req, res));
router.get("/all_users", (req, res) => FrontController.getAllUsers(req, res));
router.get("/all_departments", (req, res) => FrontController.getAllDepartments(req, res));

//Routes to create new instances of an entity.
router.post("/ticket", (req, res) => FrontController.addTicket(req, res));
router.post("/user", (req, res) => FrontController.addUser(req, res));
router.post("/department", (req, res) => FrontController.addDepartment(req, res));

//Routes to get a specific instance of an entity.
router.get("/ticket/:id", (req, res) => FrontController.getTicket(req, res));
router.get("/user/:id", (req, res) => FrontController.getUser(req, res));
router.get("/department/:id", (req, res) => FrontController.getDepartment(req, res));

//Routes to update an instance of any entity.
router.put("/ticket/:id", (req, res) => FrontController.updateTicket(req, res));
router.put("/user/:id", (req, res) => FrontController.updateUser(req, res));
router.put("/department/:id", (req, res) => FrontController.updateDepartment(req, res));

//Routes to delete instances of any entity.
router.delete("/ticket/:id", (req, res) => FrontController.deleteTicket(req, res));
router.delete("/user/:id", (req, res) => FrontController.deleteUser(req, res));
router.delete("/department/:id", (req, res) => FrontController.deleteDepartment(req, res));

export default router;