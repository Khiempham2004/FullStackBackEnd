import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import userController from "./controller/users.controller.js";
import authentication from "./middleware/authentication.middleware.js";
import postController from "./controller/post.controller.js";
import authenticationMiddleware from "./middleware/authentication.middleware.js";
import authenticationAdmin from "./middleware/authentication-admin.middleware.js";
// import authorization from "./middleware/authorization.middleware.js";
const app = express();

app.use(express.json());
app.use(morgan("combined"));


// Private router 
app.use("/users", authentication, userController)
app.use( "/posts" , authenticationMiddleware , authenticationAdmin , postController)
// console.log("🚀 ~ app.post ~ postController:", postController)


app.use("/index", (req, res) => {
    res.status(200).send("localhost a yourName")
})
mongoose
    .connect('mongodb://127.0.0.1:27017/fullStack')
    .then(() => app.listen(3000, () => console.log(" localhost is running ")))