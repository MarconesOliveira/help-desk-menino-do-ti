import Department from "../../Models/Department.js";
import User from "../../Models/User.js";
import Ticket from "../../Models/Ticket.js";
import * as neo4j from "../../Databases/neo4j.js";
import redisClient from "../../Databases/redis.js";
import { getAllTickets } from "./TicketController.js";

neo4j.default = jest.fn().mockResolvedValue();
Ticket.find = jest.fn().mockResolvedValue({ description: "O wifi não está funcionando.", code: "001" });
redisClient.get = jest.fn().mockResolvedValue(null);
redisClient.set = jest.fn().mockResolvedValue(null);

describe("Ticket Operations", () => {
    beforeAll(async () => {

    });
    afterAll(async () => {
        
    });
    beforeEach(async () => {
        
    });
    afterEach(async () => {
        
    });

    test("Get all Tickets, no cache saved", async () => {
        let statusCode = null;
        let response = null;
        const req = { };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await getAllTickets(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBeTruthy();
    });

});
