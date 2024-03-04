import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    _id : ObjectId,
    userName :String , 
    email : String,
    password : String,
    roles : [String]
});

const UserModel = mongoose.model("user" , UserSchema);

export default UserModel;
