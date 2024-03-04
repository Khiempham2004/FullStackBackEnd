import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose, { Schema } from 'mongoose';
import multer, { diskStorage } from 'multer';
import { v2 as cloudinary } from "cloudinary";
const app = express()

dotenv.config();

const diskStorages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ".png")
    }
})
const upload = multer({ storage: diskStorages });


const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './image')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ".png")
    }
})

const image = multer({ storage: imageStorage });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

// Khởi tạo tùy chọn lưu trữ memoryStorage
// const storage = multer.memoryStorage();
app.use(express.json())
app.use(morgan("combined")); //logger

const PostModel = new Schema({
    // _id: ObjectId,
    content: String,
    createAt: String,
    isPublic: Boolean,
    attachment: [
        {
            pucblicId: String,
            url: String,
        },
    ],
});

const postModel = mongoose.model("post", PostModel);


app.use("/index", (req, res) => res.status(200).send("hello word!"))


app.post("/image" , image.array ("files") , async (req, res) => {
    try {
        const files = req.files;
        if (!files) {
            return res.status(400).send("không có tệp nào tải lên")
        }
        res.json({
            code : 200,
            message : "đẩy file thành công lên tệp",
            data : files,
        })
    } catch (error) {
        res.json({
            code : 404,
            message : "success"
        })
    }
} )
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        if(!file) {
            return res.status(200).send({error : "khongo có tệp tải lên"})
        }
        res.json({
            message : "tệp được tải lên thành công",
            data : file,
        })
        if (file.length > 2 || file.every((file) => file.size > 5 * 1024)) {
            res.status(400).send("too many people file or too large")
        }
        // const files = req.files; // updoad file single
        const imageUrls = [];
        for (const files of file) {
            const dataUrl = `data:${files.minetype}; base64 , ${files.buffer?.toString("base64")}`

            const fileName = file.originalname.split(',')[0];

            const result = await cloudinary.uploader.upload(dataUrl, {
                public_id: fileName,
            });

            imageUrls.push({ publicId: result.public_id, url: result.url })
        }

        const post = await postModel.create({
            content: req.body.content,
            isPublic: req.body.isPublic,
            attachment: imageUrls,
            createAt: new Date().getTime(),
        });
        res.status(200).send(post);
    } catch (error) {
        res.json({
            code: 404,
            message: "success"
        })
    }
})

app.delete("/posts/delete", async (req, res) => {
    try {
        const post = await PostModel.find()
    } catch (error) {
        res.json({
            code: 500,
            message: "success"
        })
    }
})
mongoose
    .connect('mongodb://localhost:27017/NodeJs')
    .then((app.listen(process.env.PORT, () => console.log('Server is running!')
    ))
    );
