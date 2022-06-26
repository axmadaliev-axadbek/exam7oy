import Joi from 'joi'

export const loginSchema = Joi.object({
    password: Joi.string().required(),
    username: Joi.string().required().max(30)
})

export const registerSchema = Joi.object({
    password: Joi.string().required(),
    username: Joi.string().required().max(30),
    email: Joi.string().required()
})