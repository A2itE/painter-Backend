import express from "express"
import userController from "../controller/userController.js"

const router = express.Router()

router.post("/signUp", userController.signUp)
router.post("/login", userController.login)
router.get("/getAllUsers", userController.getAllUsers)
router.get("/getSingleUser/:id", userController.getSingleUser)



////////////////////////Admin login route////////////////////////////
router.post("/adminLogin", userController.adminLogin)

export default router