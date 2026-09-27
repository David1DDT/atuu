import { model, Schema } from "mongoose";

export type userType = {
    id: string,
    username: string
}


export const userSchema = new Schema<userType>({
    username: { type: String, required: true }
})


export const User = model<userType>("User", userSchema)