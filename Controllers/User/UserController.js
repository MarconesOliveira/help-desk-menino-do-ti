import User from "../../Models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../../utils/jwt.js";

export async function getAllUsers(req, res) {
    const users = await User.find({},"name employeeID");
    res.json({"msg":users});
}

export async function addUser(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error saving password."});
    }
    const user = new User(req.body);
    user.save()
        .then(() => (res.json({"msg":"User Saved on Database."})))
        .catch((error) => {
            console.log(error.code);
            res.json({"msg":"Failed to save on database."});
        });
}

export async function getUser(req, res) {
    const user = await User.findOne({employeeID: req.params.id}, "name email phone");
    res.json({"msg":user});
}

export async function updateUser(req, res) {
    const update = req.body;
    const result = await User.updateOne({
        employeeID: req.params.id
    },{
        ...update
    });
    res.json({"msg":result});
}

export async function deleteUser(req, res) {
    const result = await User.deleteOne({employeeID: req.params.id});
    res.json({"msg":result});
}

export async function userLogin(req, res) {
    const user = await User.findOne({employeeID: req.body.employeeID});
    if(user === null) {
        return res.json({"msg":"User not found."});
    }
    try {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(isMatch) {
            const token = createToken(user);
            return res.json({"msg":{"jwtToken":token}});
        }
        return res.json({"msg":"Password incorrect."});
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error checking password."});
    }
}
