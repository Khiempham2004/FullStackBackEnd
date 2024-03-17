import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    email : String,
    password : String,
    roles : [String]
})

const userModel =  mongoose.model("user" , userSchema);

export default userModel;