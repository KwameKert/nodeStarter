import {Sender, Users} from '../../db/models';
import HTTPStatus from 'http-status';
import {responseApi} from '../../utils/controller-helper';



export const  create = async (req, res, next)=> {
    try{
        const user = await getUser(req.body.UserId);
        if(user == null){
            return responseApi(res, HTTPStatus.BAD_REQUEST, null, "No user found");
        }
        const senderExists =await  checkSenderExists(req.body.name);
      
        if(senderExists){
            return responseApi(res, HTTPStatus.BAD_REQUEST, null, "Sender exist found");
        }
        const sender = await Sender.create({...req.body});
        return responseApi(res, HTTPStatus.CREATED,sender,'Created successfully');
    }catch (err) {
        console.error(err.message)
        if (err) next(err);
      }
}


export const  fetchList = async (req, res, next)=> {
    try{
        const senders = await Sender.findAll();
        if(senders.length < 1){
            return responseApi(res, HTTPStatus.NO_CONTENT, null, "No sender found");
        }
        return responseApi(res, HTTPStatus.OK,senders,'Created successfully');
    }catch (err) {
        console.error(err.message)
        if (err) next(err);
      }
}


export const  fetchListByUser = async (req, res, next)=> {
    try{
        const senders = await Sender.findAll({where: {UserId: req.params.id}});
        if(senders.length < 1){
            return responseApi(res, HTTPStatus.NO_CONTENT, null, "No sender found");
        }
        return responseApi(res, HTTPStatus.OK,senders,'Created successfully');
    }catch (err) {
        console.error(err.message)
        if (err) next(err);
      }
}


const checkSenderExists = async (name) =>{
    return await Sender.findOne({where: {name}})
}

const  getUser = async (id) =>{
    return await Users.findByPk(id);
}
