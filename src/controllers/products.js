import {write, read} from '../utils/model.js'
import path from 'path'
import {ForbiddenError} from "../utils/errors.js"

const GET = (req,res,next) => {
    let subCategories = read('subCategories')
    let products = read('products')
    let categories = read('categories')
    let {categoryId, subCategoryId, model, color} = req.query
    let {id} = req.params
    if(id) {
        return res.status(200).send(
            products.filter(category =>  category.product_id == id )
        )        
    }
    if(subCategoryId ) {
        products = products.filter(item => item.sub_category_id == subCategoryId)  
    } 
    if(model) {
        products = products.filter(item => item.model == model)
    } 
    if(color) {
        products = products.filter(item => item.color == color)
    } 
    if(categoryId) {
        let subCtgs = subCategories.filter(item => item.category_id == categoryId)
        products = subCtgs.map(el => {                        
            el = products.filter(x => x.sub_category_id == el.sub_category_id)
            return el
    });
        
    }  
    products = products.map(el => {
        el.productId = el.product_id
        el.subCategoryId = el.sub_category_id 
        el.productName = el.product_name
        delete el.product_id
        delete el.product_name
        delete el.sub_category_id
        return el
    })

    res.status(200).send(products)  
}

const POST = (req, res, next) => {
    try {
        let products = read('products')
       
        let newPrd = {
            product_id: products.length ? products.at(-1).product_id + 1 : 1, 
            sub_category_id: req.body.subCategoryId,
            model: req.body.model,        
            product_name: req.body.productName,
            color: req.body.color,
            price: req.body.price,
        }
        products.push(newPrd)
        write('products', products)
        console.log(process.cwd());
        res.status(201).json({
            status: 201,
            message: 'created',
            post: newPrd
        })
    } catch (error) {
        return next(new ForbiddenError(401, error.message))  
    }
}

const PUT = (req, res, next) => {
    try {
        let products = read('products')
        let item = products.find(ctg => ctg.sub_category_id == req.params.id)
        if(req.body.name) {
            item.sub_category_name = req.body.name
        }
        write('products', products)
        res.send(item)
    } catch (error) {
        console.log(error.message);
    }
}
const DELETE = (req, res, next) => {
    try {
        let products = read('products')
        let news =  products.filter(item => item.sub_category_id != req.params.id)
        write('products', news)
        res.send(news)
    } catch (error) {
        console.log(error.message);
    }
}


export default {
    GET, POST, DELETE, PUT
}















