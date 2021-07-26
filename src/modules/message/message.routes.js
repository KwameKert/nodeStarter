import { Router } from 'express';
import * as MessageController from './message.controller';
//import validate from 'express-validation';
//import {registerValidation, loginValidation, validate} from './user.validation';
import { apiAuthentication } from '../../middleware/authMessage' 

const MessengerRouter = Router();

MessengerRouter.post('/',apiAuthentication,  MessageController.create);
MessengerRouter.post('/callback',  MessageController.callback);
MessengerRouter.post('/route/callback',  MessageController.routeCallback);
MessengerRouter.get('/route/callback',  MessageController.routeCallbackOk);

export default MessengerRouter;