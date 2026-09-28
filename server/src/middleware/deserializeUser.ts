import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import type { Socket } from "socket.io";
import type { ExtendedError } from "socket.io";

declare module "socket.io" {
    interface Socket {
        player?: {
            username: string,
            id: string
        }
    }
}

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
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




export const deserializeUserSocketIO = (socket: Socket, next: (err?: ExtendedError) => void) => {

    const authHeader = socket.handshake.headers['authorization'];

    if (!authHeader) {
        return next(new Error('Autentificare eșuată: Header Authorization lipsă'));
    }

    try {

        const player = jwt.verify(authHeader, process.env.SECRET_KEY || "secret");
        if (typeof player === "string" || typeof player.username !== "string" || typeof player.id !== "string") {
            return next(new Error("Invalid token payload"))
        }
        socket.player = {
            username: player.username,
            id: player.id
        }

        next();
    } catch (err) {
        return next(new Error('Autentificare eșuată: Token invalid'));
    }
};
