import express from "express"
import postModel from "../model/post.model.js";

const postController = express.Router();

postController.get("/", async (req, res) => {
    try {
        const posts = await postModel.find({});
        res.json({
            data: posts,
            code: 200,
            message: "success",
            error : null,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
})

postController.get(":userId", (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// userController.post("/posts",async (req, res) => {
//     try {
//         const { userId, content, isPublic } = req.body;
//         const createdAt = new Date().toISOString();

//         //validate input
//         if (!userId) throw new Error('userId is required');
//         if (!content) throw new Error('content is required');
//         if (!isPublic) throw new Error('isPublic is required');

//         //Luu vao co so du lieu
//         const newPost = await PostModel.create({
//             userId,
//             content,
//             isPublic,
//             createdAt,
//         });
//         // Return 
//         res.status(201).send({ 
//             data: newPost, 
//             message: 'Post created successfully', 
//             success: true 
//         });
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error)
//     }
// })

postController.post("/", async (req, res) => {
    try {
        const { content , date  } = req.body;

        const user = await postModel.create({
           content,
           date ,
        })
        res.status(201).send({
            data: user,
            message: "success",
            error: null,
        });
    } catch (error) {
        console.log(error)
        res.json({
            code: 500,
            message: "success"
        })
    }
})


export default postController;