import mongoose from "mongoose";

const Schema = mongoose.Schema;
const usersLogin = new Schema({
    email: String,
    username: String,
    password: String,
})

const userModel = mongoose.model("username", usersLogin);

export default userModel;