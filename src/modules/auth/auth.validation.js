import Joi from 'joi';
import {body, validationResult} from 'express-validator';

export const registerValidation = () => {
    return [
        body('username').isString(),
        body('email').isEmail(),
        body('password').isLength({min: 5})
    ]
}

export const loginValidation = () => {
    return [
        body('username').isString(),
        body('password').isLength({min: 5})
    ]
}
export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

    return res.status(400).json({
        errors: extractedErrors,
    })
}


// export default {
//   register: {
//     body: {
//       name: Joi.string().required(),
//       eamil: Joi.string().email().required(),
//       password: Joi.string().min(6).max(30).required(),
//     },
//   },
//   login: {
//     body: {
//       email: Joi.string().email().required(),
//       password: Joi.string().min(6).max(60).required(),
//     },
//   },
// };
