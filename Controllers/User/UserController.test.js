import { getAllUsers } from "./UserController.js";
import request from "supertest";

describe("User Operations", () => {
    beforeAll(() => {

    });
    afterAll(() => {
        
    });
    test("Get all Users", () => {
        const response = await request(baseURL).get("/all_users");
        expect(response.statusCode).toBe(200);
    });
})