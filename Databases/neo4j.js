import { driver as _driver, auth } from 'neo4j-driver';

const host = process.env.NEO4J_HOST;
const port = process.env.NEO4J_HOST;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;

const driver = _driver(`bolt://${host}:${port}`, auth.basic(user, password));
const neo4jClient = driver.session();

export default neo4jClient;
