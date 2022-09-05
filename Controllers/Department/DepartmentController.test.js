import Department from "../../Models/Department.js";
import User from "../../Models/User.js";
import * as neo4j from "../../Databases/neo4j.js";
import { getAllDepartments, addDepartment, getDepartment, deleteDepartment } from "./DepartmentController.js";

neo4j.default = jest.fn().mockResolvedValue();
Department.find = jest.fn().mockResolvedValue([{ name: "Jornalismo", code: "001" }, { name: "Vendas", code: "002" }]);
Department.findOne = jest.fn().mockResolvedValue({ name: "Jornalismo", code: "001" });
Department.deleteOne = jest.fn().mockResolvedValue("Deleted count: 1");
Department.prototype.save = jest.fn().mockResolvedValue();
User.find = jest.fn().mockResolvedValue([{ name: "Maria" }]);

describe("Department Operations", () => {
    beforeAll(async () => {

    });
    afterAll(async () => {
        
    });
    beforeEach(async () => {
        
    });
    afterEach(async () => {
        
    });

    test("Get all Departments", async () => {
        let statusCode = null;
        let response = null;
        const req = { };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await getAllDepartments(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBeTruthy();
    });

    test("Add Department", async () => {
        let statusCode = null;
        let response = null;
        const req = {
            body: {
                name: "Vendas",
                code: "001",
                supervisor: "001",
                email: "vendas@gmail.com"
            }
        };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await addDepartment(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBe("Department Saved on Database.");
    });

    test("Get Department", async () => {
        let statusCode = null;
        let response = null;
        const req = {
            params: {
                code: "001"
            }
        };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await getDepartment(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBeTruthy();
    });

    test("Delete Department", async () => {
        let statusCode = null;
        let response = null;
        const req = {
            params: {
                code: "001"
            }
        };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await deleteDepartment(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBe("Deleted count: 1");
    });

});
