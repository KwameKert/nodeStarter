import { Router } from 'express';
import UserRouter from '../user/user.routes';
import AuthRouter from '../auth/auth.routes';
import ConfigurationRouter from '../configuration/configuration.routes';
import PaymentRouter from '../payment/payment.routes';
import SenderRouter from '../sender/sender.routes';
import MessengerRouter from '../message/message.routes';
import *  as Controller from './controller';
const apiRouter = Router();


apiRouter.get('/health', Controller.check );
apiRouter.use('/user', UserRouter);
apiRouter.use('/auth', AuthRouter);
apiRouter.use('/payment', PaymentRouter);
apiRouter.use('/configuration', ConfigurationRouter);
apiRouter.use('/sender', SenderRouter);
apiRouter.use('/message', MessengerRouter);

export default apiRouter;