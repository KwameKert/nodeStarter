import {Configuration, Payment, Users} from '../../db/models';
import HTTPStatus from 'http-status';
import {responseApi} from '../../utils/controller-helper';
import configuration from '../../db/models/configuration';

export const  create = async (req,res, next)=>{

    try{
        var payment = null;
        console.log(req.body)
        let configuration = await getConfiguration(req.body.configurationId);
        let user = await getUser(req.body.userId);
        
        if(configuration == null){
            //console.log("no configuration")
            return responseApi(res, HTTPStatus.BAD_REQUEST,null,'Configuration does not exist');
        }
      
        if(user == null){
            //console.log("no user")
            return responseApi(res, HTTPStatus.BAD_REQUEST,null,'User does not exist');
        }

        //creditBalance, 
        if(req.body.creditAmount > configuration.creditsToDispense){
            return responseApi(res, HTTPStatus.EXPECTATION_FAILED,null,'Cannot process this payment');
        }

         payment = await Payment.create({
            status: 'successful',
            UserId: req.body.userId,
            ConfigurationId: req.body.configurationId,
            creditAmount: req.body.creditAmount
        });
        await Users.update({creditBalance: user.creditBalance + creditAmount}, {where: {id: req.body.userId}});
        await Configuration.update({creditsToDispense: configuration.creditsToDispense - req.body.creditAmount },{where: {id: req.body.configurationId}});

        return responseApi(res, HTTPStatus.CREATED,payment,'Created successfully');
    }catch (err) {
       console.trace(err)
        console.error(err.message)
        if (err) next(err);
      }
}



export const  fetchListAll = async (req,res, next)=>{

    try{
        var paymentList = await Payment.findAll();
       if(paymentList.length < 1){
           return responseApi(res, HTTPStatus.NO_CONTENT, null, 'No list here')
       }
        return responseApi(res, HTTPStatus.OK,paymentList,'Fetched successfully');
    }catch (err) {
      console.trace(err)
        console.error(err.message)
        if (err) next(err);
      }
}


export const  fetchListByUser = async (req,res, next)=>{

    try{
        let user = await getUser(req.params.id);
        if(user == null){
        
            return responseApi(res, HTTPStatus.BAD_REQUEST,null,'User does not exist');
        }
        var paymentList = await Payment.findAll({where:{UserId: req.params.id}});
    
       if(paymentList.length < 1){
           return responseApi(res, HTTPStatus.NO_CONTENT, null, 'No list here')
       }
        return responseApi(res, HTTPStatus.OK,paymentList,'Fetched successfully');
    }catch (err) {
      console.trace(err)
        console.error(err.message)
        if (err) next(err);
      }
}


export const  fetchListByConfiguration = async (req,res, next)=>{

    try{
        var paymentList = await Payment.findAll({where:{ConfigurationId: req.params.id}});
        let config = await getConfiguration(req.params.id);
        if(config == null){
        
            return responseApi(res, HTTPStatus.BAD_REQUEST,null,'Configuration does not exist');
        }
       if(paymentList.length < 1){
           return responseApi(res, HTTPStatus.NO_CONTENT, null, 'No list here')
       }
        return responseApi(res, HTTPStatus.OK,paymentList,'Fetched successfully');
    }catch (err) {
      console.trace(err)
        console.error(err.message)
        if (err) next(err);
      }
}


const   getConfiguration = async (id)=>{
    return await Configuration.findByPk(id);
}

const  getUser = async (id) =>{
    return await Users.findByPk(id);
}

