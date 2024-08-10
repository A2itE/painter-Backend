import express from "express"
import dotenv from "dotenv"
import connectionDb from "./connection/db.connect.js"
import router from "./routes/userRouter.js"
import fileUpload from "express-fileupload"
import cors from "cors"
import contactUsRouter from "./routes/contactUsRoutes.js"

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
connectionDb()
app.use(express.json())
app.use(fileUpload())
app.use("/user", router)
app.use("/contactUs", contactUsRouter)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})



