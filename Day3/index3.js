import express from "express";
import axios from "axios";

const server = express();

server.use(express.json());
server.post("/users", async (req ,res) =>{
    const body = req.body;
    console.log("body" , body);
    try {
        // try-catch muốn người dùng validate 
        if(!body.userName) throw new Error("not default name")
        if(!body.email) throw new Error("not default email")
        if(!body.age) throw new Error("not default age")
        if(!body.avatar) throw new Error("not default avatar")

        //xử lý logic
        const id = v4();
        //Lưu vào database jsonserver
        const newUser = await axios.post("http://localhost:8000/users" , {...body , id})
        res.status(200).send(newUser)    
    } catch (error) {
        res.status(500).send(`data khong truy cap hop le -${error.message}`)
    }
})

server.listen(3000, () => {
    console.log("Server is running")
})

