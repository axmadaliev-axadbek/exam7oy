import express from "express";
const router = express.Router()
import categoriesControllers from '../controllers/categories.js'
import checkToken from "../middleware/checkToken.js"

router.get('/categories', categoriesControllers.GET)
router.get('/categories/:id', categoriesControllers.GET)

router.post('/categories', checkToken, categoriesControllers.POST)
router.put('/categories/:id', checkToken, categoriesControllers.PUT)
router.delete('/categories/:id',checkToken,  categoriesControllers.DELETE)

export default router