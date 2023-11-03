"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("../controllers/authentication");
var index_1 = require("../index");
var sendEmail_1 = require("../controllers/sendEmail");
exports.default = (function (router) {
    router.post('/auth/register', authentication_1.register);
    router.get('/getData', index_1.data);
    router.post('/sendEmail', sendEmail_1.sendEmail);
});
