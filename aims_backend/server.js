import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from "./routes/routes.js";
import DBconnection from './database/db.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

app.use('/', router);

app.get('/', (req, res) => {
    res.send('Welcome to the AIMS Portal Backend');
  });

DBconnection();

app.listen(8000, () => {
    console.log("server is listening on port 8000"); 
});