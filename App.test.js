import supertest from "supertest";
import App from "./App.js";
import mongoose from "./Databases/mongodb.js";

const request = supertest(App);

describe("App endpoints", () => {
    beforeAll(async () => {

    });
    afterAll(async () => {
        mongoose.disconnect().then(console.log("MongoDB disconnected."));
    });
    beforeEach(async () => {
        
    });
    afterEach(async () => {
        
    });
    test("Get homepage", async () => {
        const response = await request.get("/");
        expect(response.statusCode).toBe(200);
    });
    test("Get all Users", async () => {
        const response = await request.get("/all_users");
        expect(response.statusCode).toBe(200);
    });
    test("Get not found", async () => {
        const response = await request.get("/wrvgwrgv15156vwr");
        expect(response.statusCode).toBe(404);
    });
});
