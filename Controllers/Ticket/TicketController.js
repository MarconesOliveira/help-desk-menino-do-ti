import Ticket from "../../Models/Ticket.js";
import User from "../../Models/User.js";
import Department from "../../Models/Department.js";
import mongoose from "mongoose";

export async function getAllTickets(req, res) {
    const tickets = await Ticket.find({}, "-_id -__v");
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
    res.json({"msg":result});
}

export async function deleteTicket(req, res) {
    const result = await Ticket.deleteOne({code: req.params.code});
    res.json({"msg":result});
}