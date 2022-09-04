import { createToken, validateToken } from "./jwt";

const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJhZ2UiOjI2LCJpYXQiOjE2NjIyNDk4ODQsImV4cCI6MTY2MjI1MDQ4NH0.rdSiyxKiyOVORTbsZkWIngr2pAL7en18bwRV-T9ehB8";
const invalidToken = "avwdevwdevwdewdevsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJhZ2UiOjI2LCJpYXQiOjE2NjIyNDk4ODQsImV4cCI6MTY2MjI1MDQ4NH0.rdSiyxKiyOVORTbsZkWIngr2psvAL7en18bwRV-T9ehB8";
const user = {
    "name": "John Doe",
    "age": 26
};

describe("JWT functions.", () => {
    test("Generate a jwt.", () => {
        const token = createToken(user);
        expect(token).toBeDefined();
    });

    test("Verify no jwt on Header", () => {
        let statusCode = null;
        const req = {headers: ""};
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { }}); }};
        const next = () => { };
        validateToken(req, res, next);
        expect(statusCode).toBe(401);
    });

    test("Verify an expired jwt.", () => {
        let statusCode = null;
        const req = {headers: {authorization: `Bearer ${expiredToken}`}};
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { }}); }};
        const next = () => { };
        validateToken(req, res, next);
        expect(statusCode).toBe(403);
    });

    test("Verify an invalid jwt.", () => {
        let statusCode = null;
        const req = {headers: {authorization: `Bearer ${invalidToken}`}};
        const res = {"status": function(status) { statusCode = status; return ({"json": function(msg) { }}); }};
        const next = () => { };
        validateToken(req, res, next);
        expect(statusCode).toBe(403);
    });

    test("Verify a valid jwt.", () => {
        const validToken = createToken(user);
        const req = {headers: {authorization: `Bearer ${validToken}`}};
        const res = {"status": function(status) {return ({"json": function(msg) { }});}};
        let response = false;
        const next = () => { return response = true; };
        validateToken(req, res, next);
        expect(response).toBe(true);
    });
});

