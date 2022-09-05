import Department from "../../Models/Department.js";
import User from "../../Models/User.js";
import neo4jQuery from "../../Databases/neo4j.js";

export async function getAllDepartments(req, res) {
    const departments = await Department.find({}, "-_id -__v");
    return res.status(200).json({"msg":departments});
}

export async function supervisorExistInDatabase(providedEmployeeID) {
    const supervisor = await User.find({ employeeID: providedEmployeeID });
    if(supervisor.length === 0) {
        return false;
    }
    return true;
}

export async function addDepartment(req, res) {
    const department = new Department(req.body);
    
    if( !(await supervisorExistInDatabase(department.supervisor))) {
        return res.status(400).json({ "msg":"Invalid Supervisor EmployeeID." });
    }

    department.save()
        .then(() => {
            neo4jQuery(`CREATE (a:Department {name: "${department.name}", code: "${department.code}"})`)
                .then(() => neo4jQuery(`match (p:Person {employeeID: "${department.supervisor}"}) match (d:Department {code: "${department.code}"}) create (p)-[rel:SUPERVISIONA]->(d)`))
            return res.status(200).json({"msg":"Department Saved on Database."});
        })
        .catch((error) => {
            if(error.code === 11000) {
                return res.status(400).json({"msg":"Invalid Department Code."});
            }
            return res.status(400).json({"msg":"Failed to save on database."});
        });
}

export async function getDepartment(req, res) {
    const department = await Department.findOne({code: req.params.code}, "-_id -__v");
    res.status(200).json({"msg":department});
}

export async function updateDepartment(req, res) {
    const update = req.body;

    if( !(await supervisorExistInDatabase(update.supervisor))) {
        return res.status(400).json({ "msg":"Invalid Supervisor EmployeeID." });
    }

    const result = await Department.updateOne({
        code: req.params.code
    },{
        ...update
    });
    return res.status(200).json({"msg":result});
}

export async function deleteDepartment(req, res) {
    const result = await Department.deleteOne({code: req.params.code});
    neo4jQuery(`match (a:Department) where a.code = "${req.params.code}" detach delete (a)`);
    res.status(200).json({"msg":result});
}
