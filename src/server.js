import express from "express";
import cors  from 'cors';
import { PORT } from './config.js'
import userRouter from './routers/users.js'
import categoriesRouter from './routers/categories.js'
import subCategoriesRouter from './routers/subCategories.js'
import productsRouter from './routers/products.js'
import fileUpload from "express-fileupload";
import path from "path";
import moment from 'moment'
const app = express()


app.use(express.json())
app.use(fileUpload())
app.use(cors())



app.get('/', (req, res) => {
    res.send('hello')
})

app.use(userRouter)
app.use(categoriesRouter)
app.use(subCategoriesRouter)
app.use(productsRouter)
app.listen( PORT, () => console.log(`${PORT} runing`))































