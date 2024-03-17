import express from "express"
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const server = express();

server.use(express.json());
// server.use(morgan("combined"))

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const studentSchema = new mongoose.Schema({
    name: String,
    score: Number,
    dateOfBirth: Date,
})
const StudentModel = mongoose.model("student", studentSchema)

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
})

const userModel = mongoose.model("Login", userSchema)


server.post("/student", async (req, res) => {
    const { skip, limit } = req.body;
    const size = 10; // Page size
    try {
        const totalStudent = await StudentModel.aggregate([
            { $match: { score: { $gt: 0 } } },
            { $count: "totalCount" }
        ]);
        const students = await StudentModel.find({
            score: {
                $gt: 30,
            }
        }).sort({ score: -1, name: -1, dateOfBirth: -1 }).skip(skip * size).limit(10)
        console.log("🚀 ~ server.post ~ students:", students)

        const totalPages = Math.ceil(totalStudent[0].totalCount / size)
        // find 10 thang co diem > 20
        // tinh duoc tong co bao nhieu thang cos diem > 20 ==> moi trang 10 thang (page - size)
        res.json({
            data: students,
            code: 200,
            messaege: "success",
            totalPages,
        })
    } catch (error) {
        console.log(error)
        res.json({
            code: 404,
            message: "success"
        })
    }
})

const saltRounds = 10;
server.use(express.json())

server.post("/registers", async (req, res) => {
    try {

        const { email, username, password } = req.body;
        console.log(username);
        if (!email) throw new Error("email is required")
        if (!username) throw new Error("username is required")
        if (!password) throw new Error("password is required")

        // Hasing
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const handlePassword = await bcrypt.hash(password, salt)

        const newUser = await userModel({ email, username, password: handlePassword })

        await newUser.save()
        return res.status(200).send("Register successfully!")
    } catch (error) {
        console.log("error :>>", error);
        res.status(404).send(error.message)
    }
})

server.use(express.json())
server.post("/Login", async (req, res) => {
    try {
        // const { email, password } = req.body;
        // // console.log(email);
        // // console.log(password);
        // const currentEmailLogin = await userModel.findOne({ email: email });
        // // console.log(currentEmailLogin);
        // if (currentEmailLogin) throw new Error("email is required")

        // // const salt = bcrypt.genSaltSync(saltRounds)
        // const currentPassworLogin = await userModel.findOne({ password: password, email: email })
        // // console.log(currentPassworLogin);
        // // if (!currentPassworLogin) throw new Error("password is required")
        // res.json({
        //     code: 200,
        //     messaege: "Login success",
        //     email,
        //     password,
        // })

        const { email, username, password } = req.body;
        // tìm thông tin user | tài khoản với email được gửi lên
        const currentUser = await userModel.findOne({ email });
        console.log(currentUser);

        const hashingPasswordLogin = bcrypt.hashSync(password, currentUser.salt);
        // compare password

        const userResult = await bcrypt.compare(password, hashingPasswordLogin.password)
        if (!userResult) {
            throw new Error("username and password  not corrext")
        }
        // if (hashingPasswordLogin !== currentUser.password) throw new Error("Sai tài khoản hoặc mật khẩu");

        return res.status(201).send("Login successfully")

    } catch (error) {
        console.log("error :>>", error);
        res.json({
            code: 500,
            message: "success"
        })
    }
})
mongoose
    .connect('mongodb://127.0.0.1:27017/fullStack')
    .then(server.listen(3001, () => { console.log("server is running") }));