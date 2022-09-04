import supertest from "supertest";
import App from "./App.js";

const request = supertest(App);

describe("App endpoints", () => {
    beforeAll(async () => {

    });
    afterAll(async () => {
        
    });
    beforeEach(async () => {
        
    });
    afterEach(async () => {
        
    });

    test("Get Home page", async () => {
        const response = await request.get("/");
        expect(response.statusCode).toBe(200);
    });

    test("Get All Users page", async () => {
        const response = await request.get("/users");
        expect(response.statusCode).toBe(200);
    });

    test("Get Register page", async () => {
        const response = await request.get("/register");
        expect(response.statusCode).toBe(200);
    });

    test("Get Login page", async () => {
        const response = await request.get("/login");
        expect(response.statusCode).toBe(200);
    });

    test("Get Docs page", async () => {
        const response = await request.get("/docs");
        expect(response.statusCode).toBe(301);
    });

    test("Get Not Found page", async () => {
        const response = await request.get("/wrvgwrgv15156vwr");
        expect(response.statusCode).toBe(404);
    });

});
