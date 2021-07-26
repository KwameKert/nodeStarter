import express from "express";
import './db';
import bodyParser from "body-parser";
import setup from './middleware/setup';
import { errors, status404 } from './middleware/catch';
const schedulers = require('./jobs/checkBalance');
import apiRouter  from './modules/api'

const app = express();

setup(app)


app.use('/api', apiRouter)
schedulers.init();
status404(app);
errors(app);

export default app;