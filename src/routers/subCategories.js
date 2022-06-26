import express from "express";
const router = express.Router()
import subCategoriesControllers from '../controllers/subCategories.js'
import checkToken from "../middleware/checkToken.js"


router.get('/subcategories', subCategoriesControllers.GET)
router.get('/subcategories/:id', subCategoriesControllers.GET)

router.post('/subcategories', checkToken,  subCategoriesControllers.POST)
router.put('/subcategories/:id',checkToken, subCategoriesControllers.PUT)
router.delete('/subcategories/:id', checkToken, subCategoriesControllers.DELETE)

export default router