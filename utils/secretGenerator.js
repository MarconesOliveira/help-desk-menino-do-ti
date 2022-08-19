//Simple code to generate a strong random secret.

import crypto from "crypto";

const secret = crypto.randomBytes(64).toString("hex");

console.log(secret);