import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    content : String,
    date : String, 
});

const postModel = mongoose.model("post" , postSchema);

export default postModel;
