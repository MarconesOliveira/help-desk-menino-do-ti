import mongoose from "../Databases/mongodb.js";
const { Schema } = mongoose;

const departmentSchema = new Schema({
    name: String,
    supervisor: String,
    email: String,
    code: { type:String, unique:true }
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
