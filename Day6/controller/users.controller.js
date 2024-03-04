import express from "express"
import UserModel from "../model/user.model.js";

const userController = express.Router();
  
userController.get("/", async (req, res) => {
    try {
        const userMiddleWare = await UserModel.find({})
        res.json({
            data : userMiddleWare,
            code : 200,
            message : "success",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
})

userController.get(":userId", (req, res) => {
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

userController.post("/" , async (req, res) => {
    try {
        const {  email , password } = req.body;

        const newUsers = await UserModel.create({
            userName,
            email,
            password,
            // roles : ["users"]
        })
        res.status(201).send({ 
            data: newUsers,
            message : "success",
             error : null,
        });
    } catch (error) {
        console.log(error)
        res.json({
            code :500,
            message : "success"
        })
    }
})


export default userController;