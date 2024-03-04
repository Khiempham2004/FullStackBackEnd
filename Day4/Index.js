import express from 'express';
import mongoose, { Schema, connect } from 'mongoose';

const app = express();

const bar = [
    {
        id: '1',
        email: 'mindxSchool@gmail.com',
        age: '20'
    },
    {
        id: '2',
        email: 'localhost@gmail.com',
        age: '30'
    },
    {
        message: "hello mindx!"
    }
]
const BlogPost = new Schema({
    author: String,
    title: String,
    body: String,
    date: Date,
})
const port = 8000;
const BlogModel = mongoose.model("user", BlogPost);

// 127.0.0.1 = localhost = 0.0.0.0
async function connectDB() {
    await mongoose.connect('mongodb://localhost/Nodejs');
}
app.get("/userId", (req, res) => {
    const data = { schooll: "my is boy friendly" };
    res.status(200).send(bar)
    res.status(201).send(data)
})
//RESTful API

// get all
// get one
// Get many without id in query param  -- lấy thông tin chung của toàn bộ data
app.get("/blogs", async (req, res) => {
    try {
        const blogs = await BlogModel.findById({})  
        res.status(200).send(blogs) 
    } catch (error) {
        res.status(404).send("error not default")
    }
})


// get one with id - API lấy detail của 1 data
app.get("/blogs/:blogId" , async (req , res) =>{
    try {
        const blogId = req.params.blogId;
        // const blogs = await BlogModel.findById(blogId).select({ author : 0})
        const blogs = await BlogModel.findById(blogId)
        res.status(200).send(blogs) 
    } catch (error) {
        res.status(404).send("error not default")
    }
})


app.use(express.json())
app.post("/blogs" , async (req , res) =>{
    try {
        // const newBlog = new BlogModel({
        //     author : "Nam" , 
        //     title : "Hello word" , 
        //     body : "Hello word is from Mindx! ",
        //     date :new Date(),
        // });
        // await newBlog.save();
        const body = req.body;
        // Validate input
        if (!body.author) throw new Error ("Author feild is required");
        if (!body.title) throw new Error ("Title feild is required");
        if (!body.body) throw new Error ("Body feild is required");
        if (!body.date) throw new Error ("Date feild is required");

        const newBlogs = await BlogModel.create({
            // author : author.body , 
            // title : title.body , 
            // body : body.body,
            // date : date.body,
            // pets : ["dog" , "cats"] 
            author : "Nam123", 
            title : "Hello word" , 
            body : "Chào mừng bạn đến với lập trình website!",
            date : new Date(),
        })
        res.status(201).send(newBlogs)
    } catch (error) {
        console.log(error);
        res.status(404).send("app error!")
    }
})


app.put("/blogs/:blogId" , async (req , res) =>{
    try {
        const blogs = await BlogModel.updateOne({})
        res.status(201).send(blogs)
    } catch (error) {
        console.log(error);
        res.status(404).send("app default error!")
    }
})

app.delete("/blogs/:blogId" , async (req , res) =>{
    try {
        const blogs = await BlogModel.deleteOne({})
        res.status(200).send(blogs)
    } catch (error) {
        console.log(error);
        res.status(404).send("Error not default")
    }
})
mongoose
    .connect('mongodb://127.0.0.1:27017/FullStack')
    .then(( app.listen(port, () => console.log('Server is running!')
    ))
);
