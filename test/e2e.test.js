import App from "../App.js";
import { connectMongoDB, disconnectMongoDB } from '../Databases/mongodb.js';
import { connectRedis, disconnectRedis } from '../Databases/redis.js';
import puppeteer from "puppeteer";
import * as neo4j from "../Databases/neo4j.js";

//To run this you need to be running at least mongodb and redis containers on localhost.
//Edit the .env file to setup the ports

//Neo4j can be mocked
neo4j.default = jest.fn().mockResolvedValue();

const app = App.listen(3000);

describe("Automated System Tests with Puppeteer", () => {
    beforeAll(async () => {
        await connectMongoDB("test");
        await connectRedis();
    });
    afterAll(async () => {
        await disconnectMongoDB();
        await disconnectRedis();
        app.close();
    });
    beforeEach(async () => {
        
    });
    afterEach(async () => {
        
    });

    test("Navigation links are working", async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 100,
            args: ["--window-size:1280,720"]
        });
        const page = await browser.newPage();
        
        const history = [];

        //Home
        await page.goto('http://localhost:3000');
        history.push(await page.title());
        
        //All Users
        await page.click("button#goto-users");
        history.push(await page.title());
        
        //All Departments
        await page.click("button#goto-departments");
        history.push(await page.title());
        
        //Login
        await page.click("[href='/login']");
        await page.waitForSelector("form");
        history.push(await page.title());
        
        //Register
        await page.click("[href='/']");
        await page.click("[href='/register']");
        await page.waitForSelector("form");
        history.push(await page.title());
        
        //API Docs
        await page.click("button#goto-docs");
        history.push(await page.title());
        
        await new Promise(r => setTimeout(r, 1000));
        await browser.close();
        
        expect(history[0]).toBe("Menino_do_TI");
        expect(history[1]).toBe("Menino_do_TI - Users");
        expect(history[2]).toBe("Menino_do_TI - Departments");
        expect(history[3]).toBe("Menino_do_TI - Login");
        expect(history[4]).toBe("Menino_do_TI - Register");
        expect(history[5]).toBe("Swagger UI");
    }, 30000);

    test("Register new User.", async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 20,
            args: ["--window-size:1280,720"]
        });
        const page = await browser.newPage();

        await page.goto('http://localhost:3000');
        await page.click("[href='/register']");
        await page.waitForSelector("form");

        await page.type("input#employeeID", "001");
        await page.type("input#name", "Dio Brando");
        await page.type("input#phone", "40028922");
        await page.type("input#email", "dio@gmail.com");
        await page.type("input#password", "123456");
        await page.click("button#register", { delay: 500 });
        
        await page.waitForNavigation();
        await page.click("button#goto-users");
        await page.waitForSelector(".card-title");
        const newUser = await page.$eval(".card-title", el => el.innerHTML);        
        await browser.close();

        expect(newUser).toContain("Dio Brando");
    }, 30000);

    test("Login with valid User.", async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 20,
            args: ["--window-size:1280,720"]
        });
        const page = await browser.newPage();
        await page.goto('http://localhost:3000');

        await page.click("a#login-link");
        
        await page.type("input#employeeID", "001");
        await page.type("input#password", "123456");

        await page.click("button#login", { delay: 500 });

        await page.waitForNavigation();
        const greeting = await page.$eval("#login", el => el.innerHTML);
        await browser.close();

        expect(greeting).toContain("Olá, Dio Brando");
    }, 30000);

});
