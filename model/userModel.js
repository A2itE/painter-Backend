import mongoose from "mongoose"

const userModel = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: Number, default: 0 },
    role: { type: Number, default: 1 },    //0-admin,1-users
    password: { type: String, default: "" },
    token: { type: String, default: "" },
    loginTime: { type: Number, default: 0 },
})

const userSchema = mongoose.model("user", userModel)

export default userSchema