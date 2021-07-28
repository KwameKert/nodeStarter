import {Router} from 'express';
import * as authController from './auth.controller';
//import validate from 'express-validation';
import {registerValidation, loginValidation, validate} from './auth.validation';


const AuthRouter = Router();

AuthRouter.post('/register', registerValidation(), validate, authController.register)
AuthRouter.post('/login', loginValidation(), validate, authController.login)

export default AuthRouter;