import express from "express";
import axios from "axios";

// API lấy từ users
const app = express();
// axios.get("http://localhost:8000/users").then((res) =>console.log(res.data))

app.get("/users", async (req, res) => {
    // Dùng axios GET data từ database mô phỏng (jsonserver)
    try {
        const { data } = await axios.get("http://localhost:8000/users");
        const user = data;
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send("data not default")
    };
})

//API lấy bài posts
app.get("/posts", async (req, res) => {
    // Dùng axios GET data từ database mô phỏng (jsonserver)
    try {
        // Thêm try-catch block cho các đoạn code nghi ngờ có khả năng cao bị lỗi và làm server crash
        const { data } = await axios.get("http://localhost:8000/posts");
        res.status(202).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("data not default")
    }
})

// app.get("/post1", async (req, res) => {
//     // Dùng axios GET data từ database mô phỏng (jsonserver)
//     try {
//         // Thêm try-catch block cho các đoạn code nghi ngờ có khả năng cao bị lỗi và làm server crash
//         const { data } = await axios.get("http://localhost:1000/posts");
//         res.status(202).send(data);
//     } catch (error) {
//         console.log("error:data not default");
//         res.status(500).send("data not default")
//     }
// })


app.post("/users",(req ,res) =>{
    const body = req.body;
    console.log("body" , body);
    if(body.userName) {
        // console.log("bodycontenew");
        res.status(500).send("not default userName")
        // throw new Error("not defaut userName")
    }
})
app.use(express.json())
app.post("/user", async (req ,res) =>{
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
        const {data : newUser} = await axios.post("http://localhost:8000/users" , {...body , id})
        res.status(200).send(newUser)    
    } catch (error) {
        res.status(500).send(`data khong truy cap hop le -${error.message}`)
    }
})

app.listen(3000, () => {
    console.log("consever is localhost!");
})