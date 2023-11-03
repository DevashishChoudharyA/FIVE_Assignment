"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// async..await is not allowed in global scope, must use a wrapper
exports.sendEmail = app.post('/sendEmail', async (req, res) => {
    console.log('SENDING MAIL');
    const { to } = req.body;
    console.log(to);
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'uriel.runte71@ethereal.email',
            pass: 'eQhGpaAsUxy2MMdBpU'
        }
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Devashish 👻" <uriel.runte71@ethereal.email>',
        to: to,
        subject: "Dev's Message",
        text: "hi from Dev",
        html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log(info);
});
//# sourceMappingURL=sendEmail.js.map