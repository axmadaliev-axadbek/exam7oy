import express from "express";
const router = express.Router()
import productsControllers from '../controllers/products.js'
import checkToken from "../middleware/checkToken.js"
router.get('/products',  productsControllers.GET)
router.get('/products/:id', productsControllers.GET)

router.post('/products',checkToken, productsControllers.POST)
router.put('/products/:id', checkToken, productsControllers.PUT)
router.delete('/products/:id',checkToken, productsControllers.DELETE)


export default router