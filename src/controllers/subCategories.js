import {write, read} from '../utils/model.js'
import path from 'path'
import {ForbiddenError} from "../utils/errors.js"

const GET = (req,res,next) => {
    let subCategories = read('subCategories')
    let products = read('products')
    let {id} = req.params
    subCategories = subCategories.map(subCtg => {
        subCtg["subCategoryId"] = subCtg.sub_category_id
        subCtg.subCategoryName = subCtg.sub_category_name
        subCtg.products = products.filter(item => item["sub_category_id"] == subCtg.sub_category_id)
        // products = products.filter(item => delete item.sub_category_id)
        subCtg.products = subCtg.products.map(el => {
            el.productName = el.product_name
            delete el.product_name
            delete el.sub_category_id
            return el
        })
        delete subCtg.sub_category_name
        delete subCtg.category_id
        delete subCtg.sub_category_id
        return subCtg
    })    
    if(id) {
        return res.status(200).send(
            subCategories.filter(category => category.subCategoryId == id )
        )        
    }

    res.status(200).send(subCategories)
}

const POST = (req, res, next) => {
    try {
        let subCategories = read('subCategories')
        if(!req.body.categoryId) {
            return next(new ForbiddenError(401, 'categoryId is required'))  
    
        }
        let newCtg = {
            sub_category_id: subCategories.length ? subCategories.at(-1).sub_category_id + 1 : 1, 
            category_id: req.body.categoryId,          
            sub_category_name: req.body.subCategoryName
        }
        subCategories.push(newCtg)
        write('subCategories', subCategories)
        res.status(201).json({
            status: 201,
            message: 'created',
            post: newCtg
        })
    } catch (error) {
        return next(new ForbiddenError(401, error.message))  
    }
}

const PUT = (req, res, next) => {
    try {
        let subCategories = read('subCategories')
        let item = subCategories.find(ctg => ctg.sub_category_id == req.params.id)
        
        if(req.body.name) {
            item.sub_category_name = req.body.subCategoryName
        }
        write('subCategories', subCategories)
        res.send(item)
    } catch (error) {
        console.log(error.message);
    }
}
const DELETE = (req, res, next) => {
    try {
        let subCategories = read('subCategories')
        let news =  subCategories.filter(item => item.sub_category_id != req.params.id)
        write('subCategories', news)
        res.send(news)
    } catch (error) {
        console.log(error.message);
    }
}


export default {
    GET, POST, DELETE, PUT
}















