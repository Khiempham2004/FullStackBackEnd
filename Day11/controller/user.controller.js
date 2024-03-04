import express from 'express'
import userModel from '../Model/User.model.js';
const usersController = express.Router();

//localhost:3001/users
usersController.get("" , (req ,res) => {
    try {
        res.status(200).send("user")
    } catch (error) {
        console.log(error);
        res.json({
            code : 500 , 
            message : "success"
        })
    }
})

usersController.get(":userId" , (req ,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.json({
            code : 500 , 
            message : "success",
            data : error
        })
    }
})
usersController.post(":userId" , (req ,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.json({
            code : 500 , 
            message : "success",
            data : error
        })
    }
})
usersController.put(":userId" , (req ,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.json({
            code : 500 , 
            message : "success",
            data : error
        })
    }
})

export default usersController;