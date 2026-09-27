import express from "express"
import { connectDB, disconnectDB } from "./utils/database.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const port: number = Number(process.env.PORT) || 4000


const server = app.listen(port, async () => {
    await connectDB()
    console.log(`server online on http://localhost:${port}`)
})

const signals = ["SIGTERM", "SIGINT"]

const gracefulShutdown = (signal: string) => {
    process.on(signal, async () => {
        console.log(`got ${signal} shutting down server`)
        await disconnectDB()
        process.exit(1)
    })
}




for (let signal of signals) {
    gracefulShutdown(signal)
}