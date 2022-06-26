import express from "express";
const router = express.Router()
import userControllers from "../controllers/users.js"
import checkToken from "../middleware/checkToken.js"

router.post('/register',  userControllers.REGISTER)
router.post('/login', userControllers.LOGIN)

export default router