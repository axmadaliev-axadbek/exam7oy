import {write, read} from '../utils/model.js'
import path from 'path'
import {ForbiddenError} from "../utils/errors.js"
import moment from 'moment'
import jwt from '../utils/jwt.js'
const API = `http://localhost:7000`
const GET = (req,res,next) => {
    let categories = read('categories')
    let subCategories = read('subCategories')
    let {id} = req.params
    let newObj = {}
    categories =  categories.map(category => {
        category.categoryId = category.category_id
        category.categoryName = category.category_name
        category.subCategories = subCategories.filter(item => item.category_id == category.categoryId)
        category.subCategories = category.subCategories.map(x => {
            x.subCategoryId = x.sub_category_id
            x.subCategoryName = x.sub_category_name       
            delete  x.sub_category_name 
            delete  x.sub_category_id
            delete x.category_id
            return x
        })
        delete  category.category_name
        delete  category.category_id
        return  category
    })    
    if(id) {
        return res.status(200).send(
            categories.find(categoty => categoty.categoryId == id)
        )
    }
    res.status(200).send(categories)
}

const POST = (req, res, next) => {
    try {
        let categories = read('categories')
        let token = req.headers.token
        if(!token ) {
            return next(new ForbiddenError(401, 'you are not admin'))  
        }
        let newCtg = {
            category_id: categories.length ? categories.at(-1).category_id + 1 : 1,           
            category_name: req.body.categoryName
        }
        categories.push(newCtg)
        write('categories', categories)
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
        let categories = read('categories')
        let item = categories.find(ctg => ctg.category_id == req.params.id)
        if(req.body.categoryName) {
            item.category_name = req.body.categoryName
        }
        write('categories', categories)
        res.send(item)
    } catch (error) {
        console.log(error.message);
    }
}
const DELETE = (req, res, next) => {
    try {
        let categories = read('categories')
        let news =  categories.filter(item => item.category_id != req.params.id)
        write('categories', news)
        res.send(news)
    } catch (error) {
        console.log(error.message);
    }
}


export default {
    GET, POST, DELETE, PUT
}















