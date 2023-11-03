"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.getUserByPhoneno = exports.createUser = exports.getUserById = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
// difference between schema and model
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phoneno: { type: String, required: true },
    hobbies: { type: String, required: true }
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
var getUsers = function () { return exports.UserModel.find(); };
exports.getUsers = getUsers;
var getUserByEmail = function (email) { return exports.UserModel.findOne({ email: email }); };
exports.getUserByEmail = getUserByEmail;
var getUserById = function (id) { return exports.UserModel.findById({ _id: id }); };
exports.getUserById = getUserById;
var createUser = function (values) { return new exports.UserModel(values).save().then(function (user) { return user.toObject(); }); };
exports.createUser = createUser;
var getUserByPhoneno = function (phoneno) { return exports.UserModel.findOne({ phoneno: phoneno }); };
exports.getUserByPhoneno = getUserByPhoneno;
var deleteUserById = function (id) { return exports.UserModel.findByIdAndDelete({ _id: id }); };
exports.deleteUserById = deleteUserById;
var updateUserById = function (id, values) { return exports.UserModel.findByIdAndUpdate(id, values); };
exports.updateUserById = updateUserById;
