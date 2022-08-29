import { driver as _driver, auth } from 'neo4j-driver';
import dotenv from "dotenv";
dotenv.config();

const dev = process.env.USE_TEST_DATABASE;

const uri = (dev) ? `bolt://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}` : process.env.AURA_DB_URI ;
const user = (dev) ? process.env.NEO4J_USER : process.env.AURA_DB_USER;
const password = (dev) ? process.env.NEO4J_PASSWORD : process.env.AURA_DB_PASSWORD;

const neo4jQuery = async (query) => {
    const driver = _driver( uri , auth.basic(user, password));
    const session = driver.session({ database: 'neo4j' });

    try {
        const result = await session.run(query)
        console.log("Query on Neo4j executed.");
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }

    await driver.close();
}

neo4jQuery("match (a) detach delete (a)");

export default neo4jQuery;
