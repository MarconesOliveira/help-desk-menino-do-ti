import User from "../../Models/User.js";

export async function getAllUsers(req, res) {
    const users = await User.find();
    res.send(users);
}

export async function addUser(req, res) {
    const user = new User(req.body);
    user.save()
        .then(() => (res.send("User Saved on Database.")))
        .catch((error) => (console.log(error)));
}

export async function getUser(req, res) {
    const user = await User.findOne({
        $or:[{employeeID: req.params.id},{_ID: req.params.id}]
    });
    res.send(user);
}

export async function updateUser(req, res) {
    const update = req.body;
    const result = await User.updateOne({
        $or:[{employeeID: req.params.id},{_ID: req.params.id}]
    },{
        ...update
    });
    res.send(result);
}

export async function deleteUser(req, res) {
    const result = await User.deleteOne({
        $or:[{employeeID: req.params.id},{_ID: req.params.id}]
    });
    res.send(result);
}
