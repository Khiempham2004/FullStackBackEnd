import { json, response } from 'express';
import utils from './index.js'

import http from "node:http"
import { stringify } from 'node:querystring';

// const utils = require('./utils.js');
// const name = 'học lập trình tại mindx';
// const listUserName = ["doraemon" , "nobita" , "chaien" , "sizuka"]
// listUserName.forEach((item) => {
//     console.log(`xinchao cac ban ${item}!`);
// });
// console.log(foo + name);  // Xin chao hoc lap trinh tai Mindx!

const context = http.createServer((request, response) => {
    console.log(request.url)
    console.log(request.body)
    console.log(request.headers)
    console.log(request.method)
    switch (request.url) {
        case "/":
            response.end(
                JSON.stringify({ endpoint: request.url, mothed: request.method })
            );
            break;

        case "/component":
            response.end(
                JSON.stringify("Hello Mindx!")
            );
            break;

        default:
            response.end(JSON.stringify("Not found!"));
            break;
    }
});

context.listen(3000, () => {
    console.log("Sever is Mindx!")
});

// console.log("Học Lập trình tại F8");

