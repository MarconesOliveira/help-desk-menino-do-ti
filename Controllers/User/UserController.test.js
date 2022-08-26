import mongoose from "../../Databases/mongodb.js";
import { getAllUsers, addUser, getUser, updateUser, deleteUser, userLogin } from "./UserController.js";

describe("User Operations", () => {
    beforeAll(async () => {

    });
    afterAll(async () => {
        mongoose.disconnect().then(console.log("MongoDB disconnected."));
    });
    beforeEach(async () => {
        
    });
    afterEach(async () => {
        
    });
    test("Get all Users", async () => {
        const req = {};
        const res = {};
        expect(1).toBe(1);
    });
});
