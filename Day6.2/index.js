import express from "express"
import mongoose from "mongoose";
// var bodyParser = require('body-parser')
const app = express();

const users = [
  {
    id: "1",
    fullName: "Doraemon",
    email: "doraemon@nobita.com",
    password: "12345",
  },
  {
    id: "2",
    fullName: "nobita",
    email: "nobita@gmail.com",
    password: "12345",
  },
  {
    id: "3",
    fullName: "subisuke",
    email: "nubisuke@gmail.com",
    password: "12345",
  },
]

app.use(express.json())

async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1/hocMongoDB')
}

connectDB();
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


app.get("/add", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) throw new Error("user is required")
  if (!password) throw new Error("password is required")


})
app.use(express.json())
app.post("/users", (req, res) => {
  const { fullName, email, password } = req.body;
  const userId = users.find(item => item.email === email && item.password === password && item.fullName === fullName)
  users.push(userId);
  res.status(200).send(users)
})

app.put("/users/:email", (req, res) => {
  const { email, password } = req.params;
  const filedUpdate = req.body;
  console.log("body", body);
  const filedUserId = users.find(user => user.email === email && user.password === password)
  for (const key in filedUpdate) {
    filedUserId[key] == filedUpdate[key]
  }
  res.status(200).send(users)
})

app.use(express.json())
app.delete("/delete", (req, res) => {
  try {
    const { email, password } = req.body;
    const curreneUser = users.findIndex(user => user.email === email && user.password === password)
    users.splice(curreneUser, 1)
    res.status(200).send(users)
  } catch (error) {
    res.status(404).send("error not default")
  }
})


app.listen(3000, () => {
  console.log("localhost not default");
})