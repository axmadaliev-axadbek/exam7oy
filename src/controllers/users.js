import {write, read} from '../utils/model.js'
import {AuthorizationError} from "../utils/errors.js"
import jwt from '../utils/jwt.js'
const API = 'http://localhost:7000'
const GET = (req,res,next) => {
    let users = read('users')
    let {userId} = req.params
    if(userId) {
        let user = users.find(user => user.userId == userId)
        delete user.password
        return res.status(200).send(user)
    }

    users = users.filter( user => delete user.password)
    res.status(200).send(users)
}

const REGISTER = (req, res, next) => {
    try {
        let users = read('users')
        let user = users.find(user => user.username == req.body.username && user.password == jwt.sign(req.body.password)) 
        if(user) {  
            return next(new AuthorizationError(401, 'user is exist'))
        }

        let newUser = {
            userId: users.length ? users.at(-1).userId + 1 : 1,
            username: req.body.username,
            password: jwt.sign(req.body.password),
            email: req.body.email,
        }
        users.push(newUser)
        write('users', users)
        console.log(process.cwd());
        delete newUser.password
        res.status(201).json({
            status: 201,
            message: 'created',
            token: jwt.sign({userId: newUser.userId}),
            user: newUser
        })
    } catch (error) {
        return next(new AuthorizationError(401, error.message))  
    }
}

const LOGIN = (req, res, next) => {
    try {
        let users = read('users')
        let user = users.find(user => user.username == req.body.username && user.password == req.body.password)
        if(!user) {
            return next(new AuthorizationError(401, 'this user is  not exist'))
        }
        delete user.password
        res.status(200).json({
            status: 200,
            message: 'succes',
            token: jwt.sign({userId: user.userId}),
            user: user
        })
    } catch (error) {
        res.send(error.m)
        console.log(error.message);
    }
}


export default {
    GET, REGISTER, LOGIN
}















