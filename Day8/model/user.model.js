import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName : String,
    email : String,
    password : String,
    role : [String]
})

const UserModel =  mongoose.model("users" , userSchema);

export default UserModel;