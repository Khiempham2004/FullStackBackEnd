import express from "express";
import { asyncCatch } from "../utils/trycacth.js";
import {
    validateFeresh,
    validateLogin,
    validateRegister
} from "../validation/auth.validation.js";
import { register, login, refresh } from "../service/auth.service.js";


const authController = express.Router();

authController.post("/register", asyncCatch(validateRegister), asyncCatch(register));

authController.post("/login", asyncCatch(validateLogin), asyncCatch(login));

authController.post("/refresh", asyncCatch(validateFeresh), asyncCatch(refresh))



export default authController;