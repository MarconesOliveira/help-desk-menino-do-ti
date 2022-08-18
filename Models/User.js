import mongoose from "../Databases/mongodb.js";
const { Schema } = mongoose;

const userSchema = new Schema({
    employeeID: String,
    name: String,
    phone: String,
    email: String,
});

const User = mongoose.model("User", userSchema);
export default User;