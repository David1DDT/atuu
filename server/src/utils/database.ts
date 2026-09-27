import { connect, disconnect } from "mongoose";

const URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/atuu"

export const connectDB = async () => {
    await connect(URI)
}

export const disconnectDB = async () => {
    await disconnect()
}