import Department from "../../Models/Department.js";

export async function getAllDepartments(req, res) {
    const departments = Department.find();
    console.log(departments);
    res.send(departments);
}

export async function addDepartment(req, res) {
    
}

export async function getDepartment(req, res) {
    
}

export async function updateDepartment(req, res) {
    
}

export async function deleteDepartment(req, res) {
    
}
