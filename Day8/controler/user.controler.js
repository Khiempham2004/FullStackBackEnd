import express from 'express'
import { asyncCatch } from '../utils/trycacth.js';

import { authen } from '../utils/authen.js';
import { author } from '../utils/author.js'
import { getAllUserservice } from '../service/user.service.js';
const userController = express.Router();

userController.get(
    "/",
    asyncCatch(authen),
    asyncCatch(author),
    asyncCatch(getAllUserservice),
);

// btnv : CRUD user
// userController.put("/:userId", asyncCatch(authen), asyncCatch(author));
// userController.delete("/:userId", asyncCatch(authen), asyncCatch(author));
// userController.post("/:userId", asyncCatch(authen), asyncCatch(author));
// userController.get("/me", asyncCatch(authen), asyncCatch(getMe));


export default userController;