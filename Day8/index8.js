import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import morgan from 'morgan';


import userController from './controler/user.controler.js';
import { asyncCatch } from './utils/trycacth.js';
import { authen } from './utils/authen.js'
import authController from './controler/auth.controller.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(morgan('combined')); // loger 

app.use("/users" , userController);
app.use("/auth" , authController)


app.use("/index" , (req, res) => {
    res.status(200).send("Hello emiu của anh")
})

mongoose
    .connect('mongodb://127.0.0.1:27017/fullStack')
    .then(app.listen(3000, () => { console.log("server is running") }));
