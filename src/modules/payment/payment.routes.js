import { Router } from 'express';
import * as PaymentController from './payment.controller';
//import validate from 'express-validation';
//import {registerValidation, loginValidation, validate} from './user.validation';
import { authJwt } from '../../config/passport' 

const PaymentRouter = Router();

PaymentRouter.post('/',authJwt,  PaymentController.create);
PaymentRouter.get('/',authJwt,  PaymentController.fetchListAll);
PaymentRouter.get('/user/:id',authJwt,  PaymentController.fetchListByUser);
PaymentRouter.get('/configuration/:id',authJwt,  PaymentController.fetchListByConfiguration);

// ConfigurationRouter.get('/:id',authJwt,  ConfigurationController.fetchItem);
// ConfigurationRouter.get('/',authJwt,  ConfigurationController.fetchList);
// ConfigurationRouter.put('/',authJwt,  ConfigurationController.update);
// UserRouter.post('/login', loginValidation(),validate, userController.login)

export default PaymentRouter;