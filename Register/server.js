import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import loginSchema from './model/login.model.js'

dotenv.config();


const server = express();
const Port = process.env.PORT ||3000
server.use(express.json());

server.post("/register", async (req, res) => {
    try {
        // Validation
        const { username, email, password } = req.body;

        if (!username) throw new Error("username is required!");
        if (!email) throw new Error('email is required!')
        if (!password) throw new Error("password is required!");

        // Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store into database
        await loginSchema.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(200).send("Register successfully!");
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).send("register error");
    }
});
server.post("/login", async (req, res) => {
    try {
        // Validation
        const { username, password } = req.body;
        if (!username) throw new Error("Username is required!");
        if (!password) throw new Error("Password is required!");

        // Hashing + compare
        const user = await loginSchema.findOne({ username });

        const result = await bcrypt.compare(password, user.password);
        console.log(result);
        if (!result) {
            throw new Error("Username or password not correct!");
        }

        return res.status(200).send("Login successfully!");
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).send(error.message);
    }
});

mongoose
    .connect('mongodb://127.0.0.1:27017/fullStack')
    .then(() => {
        server.listen(Port, () => console.log(`Server is running ${Port}`));
    });