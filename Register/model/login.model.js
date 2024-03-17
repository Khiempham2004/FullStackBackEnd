import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const loginModel = new Schema({
    username: String,
    email : String,
    password: String,
})


const loginSchema = mongoose.model('logins', loginModel);

export default loginSchema;