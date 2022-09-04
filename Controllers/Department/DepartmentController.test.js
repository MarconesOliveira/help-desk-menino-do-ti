import Department from "../../Models/Department.js";
import User from "../../Models/User.js";
import * as neo4j from "../../Databases/neo4j.js";
import { getAllDepartments } from "./DepartmentController.js";

neo4j.default = jest.fn().mockResolvedValue();
Department.find = jest.fn().mockResolvedValue({ name: "Jornalismo", code: "001" });

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
        console.log(response.msg);
        expect(statusCode).toBe(200);
        expect(response.msg).toBeTruthy();
    });
    
});
