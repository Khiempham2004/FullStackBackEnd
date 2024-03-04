import express from "express"
import PostModel from '../model/Post.model.js'
import { Types } from "mongoose";
const PostController = express.Router();

PostController.get("", async (req, res) => {
    try {
        // const query = req.query

        
        const posts = await PostModel.find()
        res.status(200).send(posts)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

PostController.get("/:postId", async (req, res) => {
    try {
        const query = req.query;
        const posts = await PostModel.findById(req.params.postId)
        res.status(200).send(posts)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

PostController.post("/", async (req, res) => {
    try {
        const { userId, content, isPublic } = req.body;
        const createdAt = new Date().toISOString();
        //validate input
        if (!userId) throw new Error('userId is required');
        if (!content) throw new Error('content is required');
        if (!isPublic) throw new Error('isPublic is required');

        //Luu vao co so du lieu
        const newPost = await PostModel.create({
            _id : new Types.ObjectId(),
            userId,
            content,
            isPublic,
            createdAt,
        });

        // Return 
        res.status(201).send({
            data: newPost,
            message: 'Post created successfully',
            success: true
        });
    } catch (error) {
        console.log(error)
        res.json({
            code : 500,
            message : "success",
        })
    }
})


PostController.put("/:postId", async (req, res) => {
    try {

        const { userId, content, isPublic } = req.body;
        const updateAt = new Date().toISOString();
        const postId = req.params.postId;
        //validate input
        if (!userId) throw new Error('userId is required');
        if (!content) throw new Error('content is required');
        if (!isPublic) throw new Error('isPublic is required');

        // update post bang postId
        const updatePost = await PostModel.findByIdOneUpdate(postId , {
            userId,
            content,
            isPublic,
            updateAt,
        }, { new: true });
        res.status(201).send({
            code: 200,
            data: updatePost,
            message: 'Post created successfully',
            success: true
        });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
PostController.delete("/delete" , async (req , res) => {
    try {
        const postId = req.params.postId;
        await PostModel.findByIdAndDelete(postId)
        res.json({
            code : 200 , 
            message : "Post deleted successfully",
            success : true,
        })
        res.sendStatus(204);
    } catch (error) {
        res.json({
            code : 500 , 
            message : "success"
        })
    }
})
export default PostController;