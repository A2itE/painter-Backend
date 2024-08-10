import userModel from "../model/userModel.js"
import jwtTokenSign from "../utilis/jwtToken.js"
import bycrypt from "bcrypt"
const saltRound = 10

const signUp = async (req, res) => {
    try {
        const validationU = await userModel.findOne({ email: req.body.email })
        if (validationU !== null) {
            return res.json({
                success: false,
                status: 400,
                message: "Email already exist",
                body: {}
            })
        } else {
            const passwordEncrypt = await bycrypt.hash(req.body.password, saltRound)
            const data = await userModel.create({ ...req.body, password: passwordEncrypt })
            const tokenData = await jwtTokenSign({ _id: data._id })
            data.token = tokenData.token
            data.loginTime = tokenData.decoded.iat
            return res.json({
                success: true,
                status: 200,
                message: "User created succesfully",
                body: data
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            message: error,
            body: {}
        })
    }
}

const login = async (req, res) => {
    try {
        const findEmail = await userModel.findOne({ email: req.body.email })
        if (findEmail == null) {
            return res.json({
                success: false,
                status: 400,
                message: "Email is not valid",
                body: {}
            })
        } else {
            const passwordVerify = await bycrypt.compare(req.body.password, findEmail.password)
            if (passwordVerify == false) {
                return res.json({
                    success: false,
                    status: 400,
                    message: "Password is not correct",
                    body: {}
                })
            } else {
                const data = await userModel.findOne({ email: req.body.email })
                const tokenUpdate = await jwtTokenSign(data._id)
                data.token = tokenUpdate.token
                data.loginTime = tokenUpdate.decoded.iat
                return res.json({
                    success: true,
                    status: 200,
                    message: "Login successfully",
                    body: data
                })
            }
        }
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            message: "error",
            body: {}
        })
    }
}

const getAllUsers = async (req, res) => {
    try {

        const data = await userModel.find({role:1})

        return res.json({
            success: true,
            status: 200,
            message: "Here are all users",
            body: data
        })
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            message: "error",
            body: {}
        })
    }
}

const getSingleUser = async (req, res) => {
    try {

        const data = await userModel.findById({_id:req.params.id})

        return res.json({
            success: true,
            status: 200,
            message: "Here is single user",
            body: data
        })
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            message: "error",
            body: {}
        })
    }
}

//////////////////////////////////Admin Login//////////////////////////////////////////

const adminLogin = async (req, res) => {
    try {
        const findEmail = await userModel.findOne({ email: req.body.email, role: 0 })
        if (findEmail == null) {

            return res.json({
                success: false,
                status: 400,
                message: "You are not authorized to this account",
                body: {}
            })
        }
        else {
            const passwordVerify = await bycrypt.compare(req.body.password, findEmail.password)
            if (passwordVerify == false) {
                return res.json({
                    success: false,
                    status: 400,
                    message: "Password is not correct",
                    body: {}
                })
            } else {
                const data = await userModel.findOne({ email: req.body.email })
                const tokenUpdate = await jwtTokenSign(data._id)
                data.token = tokenUpdate.token
                data.loginTime = tokenUpdate.decoded.iat
                return res.json({
                    success: true,
                    status: 200,
                    message: "Login successfully",
                    body: data
                })
            }
        }
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            message: "error",
            body: {}
        })
    }
}

export default { signUp, login, adminLogin, getAllUsers,getSingleUser }