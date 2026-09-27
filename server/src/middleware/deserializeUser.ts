import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(403).json({ error: "Forrbiden" })
    }

    try {
        res.locals.user = jwt.verify(token, process.env.SECRET_KEY || "secret")
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "Invalid or expired token" })
    }
}

export default deserializeUser