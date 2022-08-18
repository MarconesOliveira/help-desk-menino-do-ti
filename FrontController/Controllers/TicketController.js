import Ticket from "../../Models/Ticket.js";
import mongoose from "mongoose";

export async function getAllTickets(req, res) {
    const tickets = await Ticket.find();
    res.send(tickets);
}

export async function addTicket(req, res) {
    const ticket = new Ticket(req.body);
    ticket.save()
        .then(() => (res.send("Ticket Saved on Database.")))
        .catch((error) => (console.log(error)));
}

export async function getTicket(req, res) {
    const ticket = await Ticket.findOne({
        _ID: req.params.id
    });
    res.send(ticket);
}

export async function updateTicket(req, res) {
    const update = req.body;
    const result = await Ticket.updateOne({
        _ID: req.params.id
    },{
        ...update
    });
    res.send(result);
}

export async function deleteTicket(req, res) {
    const result = await Ticket.deleteOne({
        _ID: mongoose.Types.ObjectId(req.params.id)
    });
    res.send(result);
}