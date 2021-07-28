import bodyParser from 'body-parser';
import cors from 'cors';
import {setupPassport} from '../config/passport';

const logger = require('morgan');

//import errorhandler from 'errorhandler';
import {isDev} from '../config/constants';
//import { setupPassport } from '../config/passport';


export default (app) => {
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    // app.use(methodOverride());

    setupPassport(app);

    if (isDev()) {
        app.use(logger
        ('dev'));
        // app.use(errorhandler());
    }
};
