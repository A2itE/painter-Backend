import express from "express"
import contactUsController from "../controller/contactUsController.js"

const contactUsRouter = express.Router()

contactUsRouter.post("/createContactUs", contactUsController.createContactUs)
contactUsRouter.get("/getAllContactUs", contactUsController.getAllContactUs)

export default contactUsRouter