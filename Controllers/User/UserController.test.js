import User from "../../Models/User.js";
import * as neo4j from "../../Databases/neo4j.js";
import { getAllUsers, addUser, getUser, deleteUser } from "./UserController.js";

User.find = jest.fn().mockResolvedValue({ name: "Maria" });
User.findOne = jest.fn().mockResolvedValue({ name: "José" });
User.deleteOne = jest.fn().mockResolvedValue("Deleted count: 1");
User.prototype.save = jest.fn().mockResolvedValue();
neo4j.default = jest.fn().mockResolvedValue();

describe("User Operations", () => {
    beforeAll(async () => {

    });
    afterAll(async () => {
        
    });
    beforeEach(async () => {
        
    });
    afterEach(async () => {
        
    });

    test("Get all Users", async () => {
        let statusCode = null;
        let response = null;
        const req = { };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await getAllUsers(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBeTruthy();
    });

    test("Add User", async () => {
        let statusCode = null;
        let response = null;
        const req = {
            body: {
                employeeID: "001",
                name: "Adonis Creed",
                phone: "40028922",
                email: "adonis@gmail.com",
                password: "123456"
            }
        };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await addUser(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBe("User Saved on Database.");
    });

    test("Get User", async () => {
        let statusCode = null;
        let response = null;
        const req = {
            params: {
                employeeID: "001"
            }
        };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await getUser(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBeTruthy();
    });

    test("Delete User", async () => {
        let statusCode = null;
        let response = null;
        const req = {
            user: {
                employeeID: "001"
            }
        };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await deleteUser(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBe("Deleted count: 1");
    });

});
