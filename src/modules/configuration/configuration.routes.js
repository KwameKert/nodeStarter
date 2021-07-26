import { Router } from 'express';
import * as ConfigurationController from './configuration.controller';
//import validate from 'express-validation';
//import {registerValidation, loginValidation, validate} from './user.validation';
import { authJwt } from '../../config/passport' 

const ConfigurationRouter = Router();

ConfigurationRouter.post('/',authJwt,  ConfigurationController.create);
ConfigurationRouter.get('/:id',authJwt,  ConfigurationController.fetchItem);
ConfigurationRouter.get('/',authJwt,  ConfigurationController.fetchList);
ConfigurationRouter.put('/',authJwt,  ConfigurationController.update);
//UserRouter.post('/login', loginValidation(),validate, userController.login)

export default ConfigurationRouter;