"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const index_1 = require("../index");
const sendEmail_1 = require("../controllers/sendEmail");
exports.default = (router) => {
    router.post('/auth/register', authentication_1.register);
    router.get('/getData', index_1.data);
    router.post('/sendEmail', sendEmail_1.sendEmail);
};
//# sourceMappingURL=authentication.js.map