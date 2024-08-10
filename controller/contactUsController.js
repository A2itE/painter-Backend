import contactUsSchema from "../model/contactUsModel.js"


const createContactUs = async (req, res) => {
    try {
        const data = await contactUsSchema.create(req.body)
        return res.json({
            success: true,
            status: 200,
            message: "Message send successfully",
            body: data
        })
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            message: error,
            body: {}
        })
    }
}


const getAllContactUs = async (req, res) => {
    try {

        const data = await contactUsSchema.find()
        return res.json({
            success: true,
            status: 200,
            message: "Here is all list",
            body: data
        })
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            message: error,
            body: {}
        })
    }
}

export default { createContactUs, getAllContactUs }