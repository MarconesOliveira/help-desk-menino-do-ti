import mongoose from "../Databases/mongodb.js";
const { Schema } = mongoose;

const departmentSchema = new Schema({
    name: String,
    supervisor: String,
    email: String,
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
