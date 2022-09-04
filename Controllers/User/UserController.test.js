import User from "../../Models/User.js";
import { getAllUsers, addUser, getUser, updateUser, deleteUser, userLogin } from "./UserController.js";

User.find = jest.fn().mockResolvedValue({ name: "Maria" });

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
        const req = { };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await getAllUsers(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBeTruthy();
    });

    test("Get User", async () => {
        let statusCode = null;
        let response = null;
        const req = { };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await getAllUsers(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBeTruthy();
    });
});
