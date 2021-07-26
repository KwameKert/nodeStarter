import { Router } from 'express';
import * as userController from './user.controller';
//import validate from 'express-validation';
//import {registerValidation, loginValidation, validate} from './user.validation';
import { authJwt } from '../../config/passport' 
import { apiAuthentication } from '../../middleware/authMessage' 


const UserRouter = Router();

UserRouter.get('/balance',apiAuthentication,  userController.getBalance);
UserRouter.get('/', authJwt ,  userController.gellAllUsers);
 UserRouter.get('/:id', authJwt ,  userController.gellUser);

//UserRouter.post('/login', loginValidation(),validate, userController.login)

export default UserRouter;