import express from "express"
import mongoose from "mongoose";
import userController from './controller/user.controller.js'
import postController from "./controller/post.controller.js"; 
import morgan from "morgan";

// async function connectDB() {
//     await mongoose.connect('mongodb://127.0.0.1/Nodejs');
// }

const server = express();
//Cachs 1 : dung  server.use() => bieens dooi req , res thanh object
server.use(express.json());
server.use(morgan("combined"))



// cach 3: --> Middleware (là 1 function)

function testMiddleWare(req , res, next) {
    try {
        const {ip , headers , body ,  url} = req;
        console.log("Test middleWare");
        next();
    } catch (error) {
        res.json({
            code : 500,
            message : "success" 
        })
    }
} 
//middleware là 1 global - apply for all routes
server.use(testMiddleWare);

// function controllerMiddleware (req , res , next) {
//     try {
//         console.log("Controller middleware");
//         next();
//     } catch (error) {
//         res.json({
//             code : 500,
//             message :"success"
//         })
//     }
// }
// server.use(controllerMiddleware)
// cach 2 : dung server.use() => gop tung routing tu cac file rieng biet vao server

server.use('/posts' , postController )
server.use('/users' ,userController)

//Request -> Server -> Response (request - responsive sylce)
// Request -> Controller -> Model -> Controller ->Response (request - response cycle)
// Request -> Middleware -> Controller ->Logic handler + Model -> Controller ->Response (request - response cycle)
// Request -> Controller -> Middleware ->Logic handler + Model -> Controller ->Response (request - response cycle)
// Request -> Controller -> Middleware ->Logic handler + Model -> Controller -> Middlerware -> Response (request - response cycle)


//Connection string 
mongoose
    .connect('mongodb://localhost:27017/fullstack')
    .then(server.listen(3001, () => { console.log("server is running") }));