import express from 'express'
import mongoose from 'mongoose'
import bcrypt, { hash } from 'bcrypt'
import dotenv from 'dotenv'
const app = express();
import userModel from '../Day7/user.model.js'


dotenv.config();
app.use(express.json());
app.post("/registers", async (req, res) => {
    try {

        const { email, username, password } = req.body;
        console.log(username);
        if (!username) throw new Error("username is required")
        if (!password) throw new Error("password is required")

        // Hasing
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const handlePassword = await bcrypt.hash(password, salt)


        await userModel.create({
            email,
            username,
            password: handlePassword
        })
        // bcrypt.genSalt(saltRounds , function(err , salt) {
        //     bcrypt.hash(password , salt , function(err , hash){
        //     })
        // })
        // return res.status(200).send(handlePassword)
        // await newUser.save()
        return res.status(200).send("Register successfully!")
    } catch (error) {
        console.log("error :>>", error);
        res.status(404).send(error.message)
    }
})

app.post("/login", async (req, res) => {
    try {
        // Validation
        const { username, password } = req.body;
        if (!username) throw new Error("Username is required!");
        if (!password) throw new Error("Password is required!");

        // Hashing + compare
        const user = await userModel.findOne({ username });
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            throw new Error("Username or password not correct!");
        }

        return res.status(200).send("Login successfully!");
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).send(error.message);
    }
});
// app.post('/login', async (req, res) => {
//     try {
//         // Validation
//         const { username, password } = req.body;
//         if (!username) {
//             return res.status(400).send({ message: 'Username is required' });
//         }
//         if (!password) {
//             return res.status(400).send({ message: 'Password is required' });
//         }

//         // Find user by username
//         const user = await userModel.findOne({ username });
//         if (!user) {
//             return res.status(401).send({ message: 'Incorrect username or password' }); // Use 401 for unauthorized access
//         }

//         // Compare password using bcrypt
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(401).send({ message: 'Incorrect username or password' }); // Use 401 for unauthorized access
//         }

//         // Login successful
//         return res.status(200).send({ message: 'Login successful!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Internal server error' }); // Avoid sending error details to client
//     }
// });
mongoose
    .connect('mongodb://127.0.0.1:27017/fullStack')
    .then((app.listen(process.env.PORT || 3000 , () => {
        console.log("Server is running!");
    }))
    );


