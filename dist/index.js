"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const { MongoClient } = require('mongodb');
const app = (0, express_1.default)();
exports.default = app;
// dependencies in use
app.use((0, cors_1.default)({
    credentials: true
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
server.listen(8080, () => {
    console.log("Server running");
});
//initializers data for database
const MONGO_URL = "mongodb+srv://Devashish:Devashish@cluster0.bwlaq6l.mongodb.net/?retryWrites=true&w=majority";
const db_name = "test";
const collecton_name = "users";
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on('error', (error, Error) => {
    console.log(error);
});
const client = new MongoClient(MONGO_URL);
async function connectToDatabase() {
    await client.connect();
    console.log('Connected to the database');
}
// implementation of the api to retrieve data from database
exports.data = app.get('/getData', async (req, res) => {
    try {
        const db = client.db(db_name);
        const collection = db.collection(collecton_name);
        const data = await collection.find().toArray();
        res.json(data);
    }
    catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.use('/', (0, router_1.default)());
//# sourceMappingURL=index.js.map