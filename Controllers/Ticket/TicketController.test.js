import Department from "../../Models/Department.js";
import User from "../../Models/User.js";
import Ticket from "../../Models/Ticket.js";
import * as neo4j from "../../Databases/neo4j.js";
import redisClient from "../../Databases/redis.js";
import { getAllTickets, addTicket, getTicket, deleteTicket } from "./TicketController.js";

neo4j.default = jest.fn().mockResolvedValue();
Ticket.find = jest.fn().mockResolvedValue([{ description: "O wifi não está funcionando.", code: "001" }, { description: "Meu pc não abre o chrome.", code: "002" }]);
Ticket.findOne = jest.fn().mockResolvedValue({ description: "O wifi não está funcionando.", code: "001" });
Ticket.deleteOne = jest.fn().mockResolvedValue("Deleted count: 1");
Ticket.prototype.save = jest.fn().mockResolvedValue();
redisClient.get = jest.fn().mockResolvedValue(null);
redisClient.set = jest.fn().mockResolvedValue(null);
redisClient.del = jest.fn().mockResolvedValue(null);
User.find = jest.fn().mockResolvedValue([{ name: "Maria" }]);
Department.find = jest.fn().mockResolvedValue([{ name: "Vendas" }]);

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

    test("Add Ticket", async () => {
        let statusCode = null;
        let response = null;
        const req = {
            body: {
                description: "O wifi caiu.",
                department: "Vendas",
                requester: "001",
                state: "Aberto",
                code: "001",
            }
        };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await addTicket(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBe("Ticket Saved on Database.");
    });

    test("Get Ticket", async () => {
        let statusCode = null;
        let response = null;
        const req = {
            params: {
                code: "001"
            }
        };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await getTicket(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBeTruthy();
    });

    test("Delete Ticket", async () => {
        let statusCode = null;
        let response = null;
        const req = {
            params: {
                code: "001"
            }
        };
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { response = msg; }});}};
        await deleteTicket(req, res);
        expect(statusCode).toBe(200);
        expect(response.msg).toBe("Deleted count: 1");
    });

});
