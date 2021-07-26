import app from './app';
import constants from './config/constants';


app.listen(constants.PORT, ()=>{
    //console.log(process.env.PAYSTACK_LIVE);
    
    console.log(`App is running on port ${constants.PORT}`)

})

export default app;