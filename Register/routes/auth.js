import express from 'express'
import * as authController from  '../controller/auth.js'
const routers = express.Router();


routers.post("/register" , authController.register )



export default routers;