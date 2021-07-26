import { Router } from 'express';
import * as SenderController from './sender.controller';
//import validate from 'express-validation';
//import {registerValidation, loginValidation, validate} from './user.validation';
import { authJwt } from '../../config/passport' 

const SenderRouter = Router();

SenderRouter.post('/',authJwt,  SenderController.create);
SenderRouter.get('/',authJwt,  SenderController.fetchList);
SenderRouter.get('/user/:id',authJwt,  SenderController.fetchListByUser);


export default SenderRouter;