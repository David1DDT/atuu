import { Router, type Request, type Response } from "express";
import { createUser } from "./user.controller.js";
import { deserializeUser } from "../../middleware/deserializeUser.js";

const userRouter = Router()

userRouter.post("/create", createUser)
userRouter.get("/me", deserializeUser, (req: Request, res: Response) => {
    res.status(200).json({ user: res.locals.user })
})

export default userRouter