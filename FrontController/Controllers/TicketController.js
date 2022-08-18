import Ticket from "../../Models/Ticket.js";

export async function getAllTickets(req, res) {
    const tickets = Ticket.find();
    console.log(tickets);
    res.send(tickets);
}

export async function addTicket() {
    
}

export async function getTicket() {
    
}

export async function updateTicket() {
    
}

export async function deleteTicket() {
    
}