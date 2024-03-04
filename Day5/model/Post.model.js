import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    // _id: ObjectId,
    userId: String,
    postId: String,
    content: String,
    createAt: String,
    isPublic: Boolean,
});

const postModel = mongoose.model("post", PostSchema);

export default postModel;
