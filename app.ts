import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan';
import { db } from './models'

// middleware

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3001']
};
app.use(cors(corsOptions));

// Syncing our database
db.sync().then(() => {
    console.info("----- DATABASE CONNECTION: SUCCESSFUL -----")
});

app.listen(3000);