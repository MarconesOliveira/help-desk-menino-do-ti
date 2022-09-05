import Ticket from "../../Models/Ticket.js";
import User from "../../Models/User.js";
import Department from "../../Models/Department.js";
import redisClient from "../../Databases/redis.js";
import neo4jQuery from "../../Databases/neo4j.js";

export async function getAllTickets(req, res) {
    const ticketsOnCache = await redisClient.get("tickets");
    if (ticketsOnCache) {
        return res.status(200).json({"msg":JSON.parse(ticketsOnCache)});
    }
    const tickets = await Ticket.find({}, "-_id -__v");
    await redisClient.set("tickets", JSON.stringify(tickets));
    return res.status(200).json({"msg":tickets});
}

const userExistInDatabase = async(providedEmployeeID) => {
    const user = await User.find({ employeeID: providedEmployeeID });
    if(user.length === 0) {
        return false;
    }
    return true;
}

const departmentExistInDatabase = async(departmentCode) => {
    const department = await Department.find({ code: departmentCode });
    if(department.length === 0) {
        return false;
    }
    return true;
}

export async function addTicket(req, res) {
    const ticket = new Ticket(req.body);

    if( !(await userExistInDatabase(ticket.requester))) {
        return res.status(400).json({ "msg":"Invalid Requester EmployeeID." });
    }
    if( !(await departmentExistInDatabase(ticket.department))) {
        return res.status(400).json({ "msg":"Invalid Department Code." });
    }

    const newDate = new Date();
    ticket.issuedAt = newDate.getDate() + "/" + (newDate.getMonth()+1) + "/" + newDate.getFullYear();
    ticket.save()
        .then(() => {
            redisClient.del("tickets")
                .then(console.log("Cache reset."))
                .catch();
            neo4jQuery(`CREATE (a:Ticket {name: "Ticket ${ticket.code}", desc: "${ticket.description}", code: "${ticket.code}"}) RETURN a`)
                .then(() => neo4jQuery(`match (p:Person {employeeID: "${ticket.requester}"}) match (d:Ticket {code: "${ticket.code}"}) create (p)-[rel:REQUISITOU]->(d)`))
                    .then(() => neo4jQuery(`match (p:Ticket {code: "${ticket.code}"}) match (d:Department {code: "${ticket.department}"}) create (p)-[rel:ORIGEM]->(d)`))
                    .then(() => console.log("Query finished."));
            return res.status(200).json({"msg":"Ticket Saved on Database."})
        })
        .catch((error) => {
            console.log(error);
            if(error.code === 11000) {
                return res.status(400).json({"msg":"Invalid Ticket Code."});
            }
            return res.status(400).json({"msg":"Failed to save on database."});
        });
}

export async function getTicket(req, res) {
    const ticket = await Ticket.findOne({code: req.params.code}, "-_id -__v");
    return res.status(200).json({ "msg": ticket });
}

export async function updateTicket(req, res) {
    const update = req.body;
    const result = await Ticket.updateOne({
        code: req.params.code
    },{
        ...update
    });
    redisClient.del("tickets")
        .then(console.log("Cache reset."))
        .catch();
    res.json({"msg":result});
}

export async function deleteTicket(req, res) {
    const result = await Ticket.deleteOne({code: req.params.code});
    redisClient.del("tickets")
        .then(console.log("Cache reset."))
        .catch();
        neo4jQuery(`match (a:Ticket) where a.code = "${req.params.code}" detach delete (a)`);
    return res.status(200).json({"msg":result});
}