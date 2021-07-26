import {Message, Sender, Configuration, Users} from '../../db/models';
import axios from 'axios';
import HTTPStatus from 'http-status';
import {responseApi} from '../../utils/controller-helper';
import * as SmsIntegration from  '../../utils/sms-integration';


export const  create = async (req, res, next)=> {
    try{
      console.log(req.body)
    
        if (typeof(req.body.senderId) != 'string'){
          return responseApi(res, HTTPStatus.BAD_REQUEST, null, "Invalid Sender");
        }
      
        const sender = await checkSenderExists(req.body.senderId);
        const configuration = await Configuration.findByPk(req.user.ConfigurationId);
      
        var message =null;
        if(!req.body.senderId || sender == null){
            return responseApi(res, HTTPStatus.BAD_REQUEST, null, "Invalid Sender");
        }

        if(req.user.creditBalance < 2){
          return responseApi(res, HTTPStatus.BAD_REQUEST, null, "Insufficient balance");
        }
    
        var data = {
            type: req.body.type,
            senderId: req.body.senderId,
            UserId: sender.UserId,
            text: req.body.text,
            destination: req.body.destination,
            configuration
        }
     //   console.log("i got here")

        const response = req.body.type == "SMS_SINGLE" ? await  SmsIntegration.blastSmsSingle(data) : await  SmsIntegration.blastSmsBulk(data) ;
        if(response == null){
          return responseApi(res, HTTPStatus.EXPECTATION_FAILED,message,'Message not sent');
        }else{
          let phoneNumbers = req.body.destination.split(",");
          await Users.update({creditBalance: req.user.creditBalance - phoneNumbers.length}, {where: {id: sender.UserId}});
          return responseApi(res, HTTPStatus.CREATED,response,'Message sent');
        }

    }catch (err) {
    //    console.trace(err.message)
        if (err) next(err);
      }
}

const checkSenderExists = async (name) =>{
    return await Sender.findOne({where: {name}})
}




export const  callback = async (req, res, next)=> {
    try{
      //console.log("callback calling ", req.body)
      const message = await Message.update({status: req.body.status.name}, {where:{trackingId: req.body.messageId}})
      return responseApi(res, HTTPStatus.OK,message,'Message status updated');
    }catch (err) {
        console.error(err.message)
        if (err) next(err);
      }
}



export const  routeCallback = async (req, res, next)=> {
  try{
    console.log("route mobile callback")
    console.log("request body ->", req.body)
    //console.log("callback calling ", req.body)
    const message = await Message.update({status: req.body.sStatus}, {where:{trackingId: req.body.sMessageId}})
    return responseApi(res, HTTPStatus.OK,message,'Message status updated');
  }catch (err) {
      console.error(err.message)
      if (err) next(err);
    }
}


export const  routeCallbackOk = async (req, res, next)=> {
  try{
  
    return res.status(200).send();
  }catch (err) {
      console.error(err.message)
      if (err) next(err);
    }
}


// export const  callbackBulk = async (req, res, next)=> {
//   try{
//     //console.log("callback calling ", req.body)
//     const message = await Message.update({status: req.body.status.name}, {where:{trackingId: req.body.messageId}})
//     return responseApi(res, HTTPStatus.OK,message,'Message status updated');
//   }catch (err) {
//       console.error(err.message)
//       if (err) next(err);
//     }
// }