import express from 'express'
import { mongoose } from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import searchModel from './search.model.js';
const app = express();
const PORT = process.env.Port || 3002;

const searchSuggest = [
    {
        id: '1',
        label: "Trường Phong Độ",
        type: "school",
        link: "truongphongdo",
    },
    {
        id: '2',
        label: "Chị Đại Học Đường",
        type: "school",
        link: "chidaihocduong",
    },
    {
        id: '3',
        label: "V-League",
        type: "football",
        link: "vleague"
    },
    {
        id: '4',
        label: "Bài Hát Vui Nhộn Cho Bé",
        type: 'songsong',
        link: "baihatvuinhonchobe"
    },
    {
        id: "5",
        label: "Ốc Đảo Thanh Xuân",
        type: 'Oasis',
        link: "ocdaothanhxuan",
    },
]


app.use(express.json());
app.post("/search", async (req, res) => {
    try {
        const { id, label, type, link } = req.body;
        console.log(req.body);
        if (!id || !label || !type || !link) {
            throw new Error("query is required")
        }
        const searchs = await searchModel.create({
            id,
            label,
            type,
            link
        })

        if (!searchs) {
            throw new Error("search is required!")
        }
        // const resultSearch = searchSuggest.filter(movieSearch =>
        //     movieSearch.id.toLowerCase().includes(query.toLowerCase())
        // );
        // if (!resultSearch) throw new Error("query paramester is required");
        res.status(200).send(searchs);
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).send(error.message)
    }
})
app.put("/search/:searchId", async (req, res) => {
    try {
        const { id, label, type, link } = req.body;
        console.log(req.body);
        if (!id || !label || !type || !link) {
            throw new Error("All is required")
        }
        const searchFilms = await searchModel.findByIdAndUpdate(req.params.searchId, {
            id,
            label,
            type,
            link
        }, { new: true });
        console.log(searchFilms);
        if (!searchFilms) {
            throw new Error("searchFilm is required")
        }

        res.status(201).send(searchFilms)
    } catch (error) {
        console.log("error :>>", error);
    }
})

app.patch("/search/:label", async (req, res) => {
    try {

        const deleteSearch = await searchModel.findByIdAndDelete(req.params.label);
        if (!deleteSearch) throw new Error("delete not default")

        res.status(202).send(deleteSearch)
    } catch (error) {
        console.log("error :>>", error);
        res.json({
            code: 500,
            message: "success"
        })
    }
})

app.listen(PORT, () => { console.log(` server is running  ${PORT}`) })