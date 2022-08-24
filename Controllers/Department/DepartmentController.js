import Department from "../../Models/Department.js";

export async function getAllDepartments(req, res) {
    const departments = await Department.find({}, "-_id -__v");
    res.json({"msg":departments});
}

export async function addDepartment(req, res) {
    const department = new Department(req.body);
    department.save()
        .then(() => (res.status(200).json({"msg":"Department Saved on Database."})))
        .catch((error) => {
            console.log(error);
            res.status(400).json({"msg":"Failed to save on database."});
        });
}

export async function getDepartment(req, res) {
    const department = await Department.findOne({code: req.params.code}, "-_id -__v");
    res.status(200).json({"msg":department});
}

export async function updateDepartment(req, res) {
    const update = req.body;
    const result = await Department.updateOne({
        code: req.params.code
    },{
        ...update
    });
    res.status(200).json({"msg":result});
}

export async function deleteDepartment(req, res) {
    const result = await Department.deleteOne({code: req.params.code});
    res.status(200).json({"msg":result});
}
