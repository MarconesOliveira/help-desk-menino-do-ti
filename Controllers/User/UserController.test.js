import { teste } from "./UserController.js";

describe("User Login", () => {
    test("Successful Login", () => {
        expect(teste(1, 2)).toBe(3);
    }, );
})