import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createToken(user) {
    const secret = process.env.JWT_SECRET;
    const userObject = {...user};
    const token = jsonwebtoken.sign(userObject, secret);
    return token;
}

export function validateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token === null || token === undefined) {
        return res.status(401).json({"msg":"No token."});
    }

    const secret = process.env.JWT_SECRET;
    jsonwebtoken.verify(token, secret, (error, user) => {
        if(error) {
            console.log(error);
            return res.status(403).json({"msg":"Invalid token."});
        }
        req.user = user;
        next();
    });
}
