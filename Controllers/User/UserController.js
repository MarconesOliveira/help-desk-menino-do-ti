import User from "../../Models/User.js";
import bcrypt from "bcrypt";
import neo4jQuery from "../../Databases/neo4j.js";
import { createToken } from "../../utils/jwt.js";

export async function getAllUsers(req, res) {
    const users = await User.find({}, "-_id -__v");
    return res.status(200).json({"msg":users});
}

export async function addUser(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
    } catch (error) {
        console.log(error);
        return res.json({"msg":"Error saving password."});
    }
    const user = new User(req.body);
    user.save()
        .then(() => {
            neo4jQuery(`CREATE (a:Person {name: "${user.name}", employeeID: "${user.employeeID}"}) RETURN a`);
            return res.status(200).json({"msg":"User Saved on Database."})
        })
        .catch((error) => {
            console.log(error.code);
            return res.status(400).json({"msg":"Failed to save on database."});
        });
}

export async function getUser(req, res) {
    const user = await User.findOne({employeeID: req.params.employeeID}, "-_id -__v");
    return res.json({"msg":user});
}

export async function updateUser(req, res) {
    const update = req.body;
    const user = req.user;
    const result = await User.updateOne({
        employeeID: user.employeeID
    },{
        ...update
    });
    neo4jQuery(`match (a:Person{employeeID: "${user.employeeID}"}) set a.name = "${update.name}" return (a)`);
    return res.status(200).json({"msg":result});
}

export async function deleteUser(req, res) {
    const result = await User.deleteOne({employeeID: req.user.employeeID});
    neo4jQuery(`match (a:Person{employeeID: "${req.user.employeeID}"}) detach delete (a)`);
    return res.status(200).json({"msg":result});
}

export async function userLogin(req, res) {
    const user = await User.findOne({employeeID: req.body.employeeID});
    if(user === null) {
        return res.status(400).json({"msg":"User not found."});
    }
    try {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(isMatch) {
            const token = createToken({
                "_id":user._id,
                "employeeID":user.employeeID,
                "email":user.email,
                "name": user.name
            });
            return res.json({"msg":{"jwtToken":token}});
        }
        return res.status(400).json({"msg":"Password incorrect."});
    } catch (error) {
        console.log(error);
        return res.status(400).json({"msg":"Error checking password."});
    }
}
