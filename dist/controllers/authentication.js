"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const users_1 = require("../db/users");
const register = async (req, res) => {
    try {
        const { username, email, phoneno, hobbies } = req.body;
        if (!email || !phoneno || !username) {
            return res.sendStatus(400);
        }
        const existingUserWithEmail = await (0, users_1.getUserByEmail)(email);
        const existingUserWithPhoneno = await (0, users_1.getUserByPhoneno)(phoneno);
        if (existingUserWithEmail || existingUserWithPhoneno) {
            return res.sendStatus(400);
        }
        const user = await (0, users_1.createUser)({
            username,
            email,
            phoneno,
            hobbies
        });
        return res.sendStatus(200).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map