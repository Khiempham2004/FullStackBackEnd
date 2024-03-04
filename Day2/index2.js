import express, { json, request, response } from "express";

const app = express();
app.use(express.json()); //Middleware??

const classes = [
    {
        id: 1,
        name: 'mindx1',
        member: 50,
    },
    {
        id: 2,
        name: 'mindx2',
        member: 20,
    },
    {
        id: 3,
        name: 'mindx3',
        member: 30,
    }
]
app.get("/home", (request, response) => {
    response.status(200).send("Hello Mindx!");
});


// request : status -GET , đường dẫn : / classes ,
// Respone : status -201 , data là new classses
app.get("/classes", (req, res) => {
    //tạo thêm 1 class vào mảng  classes
    const query = req.query;
    console.log("query", query);
    // Nếu có query làm memberOver40: true thì trả những class có member > 40
    // Nếu không thì trả toàn bộ classes
    // http://localhost:3000/classes?memberOver40=true
    if (query.memberOver40) {
        const over40 = classes.filter(item => item.member > 40)
        res.send(over40)
    } else {
        res.send(classes)
    }
    res.status(201).send({ classes })
})

//Syntax query parameters - search parameters
// http://localhost:3000/users -URL 
// http://localhost:3000/users?member=10 - URL with query params


// request : status -GET , đường dẫn : / classes , chỉ lấy classes có số lượng member > 40
// Respone : status -201 , data là new classses
// app.get("/classes/over40", (req, res) => {
//     //tạo thêm 1 class vào mảng  classes
//     const name = classes.filter( (item) => item.member < 40); 
//     res.status(201).send( name);
// })


// URL parameters <> URL query search parameters
// PUT method dung de cap nhat datas
app.put("/classes/:id", (req, res) => {
    console.log("params", req.params)
    console.log("body", req.body)
    // Dùng hàm thao tác mảng để cập nhật mảng classes  
    const usersIndex = classes.findIndex( item => item.id === Number(req.params.id) );
    // console.log(usersIndex)
    classes[usersIndex] = req.body;
    res.status(200).send(classes)
})

//DELETE mothed dùng để xóa data
app.delete("/classes/:id", (req, res) => {
    // console.log("params" , req.params);
    // const { id } = req.params;
    const currentIndxUser = filter(item => item.id === id)
    users.splice(currentIndxUser, 1)
    res.status(204).send(classes);
})


// Truyền các dữ liệu lên trên API và thêm dữ liệu đó vào dánh sách dữ liệu đã có
app.use(express.json())
app.get("/users", (req, res) => {
    // const {id} = req.params;
    const body = req.body;
    users.push(body)
    res.status(200).send(users)
})


//request : method - post , duong dan : /users
//Respone : status - 201 , data la 1 object bao gom ten tuoi 
app.post("/users", (req, res) => {
    const data = { userName: "mindx", age: 20 }
    res.status(201).send(data)
})

app.listen(3000, () => {
    console.log("Server running")
})