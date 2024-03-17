import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const searchSchema = new Schema({
    id: String,
    label: String,
    type: String,
    link: String,
})

const searchModel = mongoose.model("search", searchSchema)

export default searchModel;