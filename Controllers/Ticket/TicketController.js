import Ticket from "../../Models/Ticket.js";
import mongoose from "mongoose";

export async function getAllTickets(req, res) {
    const tickets = await Ticket.find({}, "-_id -__v");
    res.json({"msg":tickets});
}

export async function addTicket(req, res) {
    const ticket = new Ticket(req.body);
    const newDate = new Date();
    ticket.issuedAt = newDate.getDate() + "/" + (newDate.getMonth()+1) + "/" + newDate.getFullYear();
    ticket.save()
        .then(() => (res.json({"msg":"Ticket Saved on Database."})))
        .catch((error) => {
            console.log(error);
            res.json({"msg":"Failed to save on database."});
        });
}

export async function getTicket(req, res) {
    const ticket = await Ticket.findOne({code: req.params.code}, "-_id -__v");
    res.json({"msg":ticket});
}

export async function updateTicket(req, res) {
    const update = req.body;
    const result = await Ticket.updateOne({
        code: req.params.code
    },{
        ...update
    });
    res.json({"msg":result});
}

export async function deleteTicket(req, res) {
    const result = await Ticket.deleteOne({code: req.params.code});
    res.json({"msg":result});
}