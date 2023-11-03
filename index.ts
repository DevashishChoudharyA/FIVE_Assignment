import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './src/router';
const { MongoClient } = require('mongodb');
const app  = express();
export default app;
// dependencies in use
app.use(cors({
    credentials:true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, ()=>{
    console.log("Server running")
});


//initializers data for database
const MONGO_URL ="mongodb+srv://Devashish:Devashish@cluster0.bwlaq6l.mongodb.net/?retryWrites=true&w=majority";
const db_name = "test";
const collecton_name = "users";
mongoose.Promise=Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('error',(error,Error)=>{
    console.log(error);
});

const client = new MongoClient(MONGO_URL);

async function connectToDatabase() {
  await client.connect();
  console.log('Connected to the database');
}
 // implementation of the api to retrieve data from database
export const data = app.get('/getData', async (req, res) => {
  try {
    const db = client.db(db_name);
    const collection = db.collection(collecton_name);

    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.use('/',router());