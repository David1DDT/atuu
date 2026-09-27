import type { Request, Response } from "express";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken"

export const createUser = async (req: Request<{}, {}, { username: string }>, res: Response) => {
    const { username } = req.body

    if (!username) {
        return res.status(400).json({ error: 400 })
    }

    const user = new User({ username })
    await user.save()

    const userObj = user.toObject()

    const payload = jwt.sign(userObj, process.env.SECRET_KEY || "secret")
    return res.status(200).json({ token: payload })
}