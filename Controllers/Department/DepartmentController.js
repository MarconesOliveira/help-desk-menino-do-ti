import Department from "../../Models/Department.js";

export async function getAllDepartments(req, res) {
    const departments = await Department.find();
    res.send(departments);
}

export async function addDepartment(req, res) {
    const department = new Department(req.body);
    department.save()
        .then(() => (res.send("Department Saved on Database.")))
        .catch((error) => (console.log(error)));
}

export async function getDepartment(req, res) {
    const department = await Department.findOne({
        $or:[{name: req.params.id},{_ID: req.params.id}]
    });
    res.send(department);
}

export async function updateDepartment(req, res) {
    const update = req.body;
    const result = await Department.updateOne({
        $or:[{name: req.params.id},{_ID: req.params.id}]
    },{
        ...update
    });
    res.send(result);
}

export async function deleteDepartment(req, res) {
    const result = await Department.deleteOne({
        $or:[{name: req.params.id},{_ID: req.params.id}]
    });
    res.send(result);
}
