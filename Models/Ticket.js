import mongoose from "../Databases/mongodb.js";
const { Schema } = mongoose;

const ticketSchema = new Schema({
    description: String,
    department: String,
    requester: String,
    state: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
