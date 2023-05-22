import { Router } from "express";
import { Allusers, loginUser, registerUser } from "../controller/users.controller.js";
import { authCheck } from "../middlewares/auth-check.js";

const user = Router()

user.get('/all',authCheck(true), Allusers)
user.post('/register', registerUser)
user.post('/login', loginUser)

export default user 