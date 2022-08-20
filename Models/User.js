import mongoose from "../Databases/mongodb.js";
const { Schema } = mongoose;

const userSchema = new Schema({
    employeeID: { type:String, unique:true },
    name: String,
    phone: String,
    email: { type:String, unique:true },
    password: String,
});

const User = mongoose.model("User", userSchema);
export default User;
