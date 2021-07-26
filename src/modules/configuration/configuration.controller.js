import {Configuration} from '../../db/models';
import HTTPStatus from 'http-status';
import {responseApi} from '../../utils/controller-helper';



export const  create = async (req, res, next)=> {
    try{
        const configuration = await Configuration.create({...req.body});
        return responseApi(res, HTTPStatus.CREATED,configuration,'Created successfully');
    }catch (err) {
        console.error(err.message)
        if (err) next(err);
      }

}


export const  update = async (req, res, next)=> {
    try{
        let configuration = await Configuration.findByPk(req.body.id);
        if(!configuration){
            return responseApi(res, HTTPStatus.BAD_REQUEST,null,'No configuration found');  
        }
        await Configuration.update({...req.body},{where: {id: configuration.id}})

        if(req.body.status == 'active'){
            await Configuration.update({status: 'inactive'}, {where:{status: 'active'}});
        }
        const updatedConfig = await Configuration.findByPk(req.body.id);
     //   console.log("config here: ", updatedConfig)
        return responseApi(res, HTTPStatus.OK,updatedConfig,'Created successfully');
    }catch (err) {
        console.error(err.message)
        if (err) next(err);
      }
}


export const  fetchItem = async (req, res, next)=> {
    try{
        const configuration = await Configuration.findByPk(req.params.id);
        if(!configuration){
            return responseApi(res, HTTPStatus.BAD_REQUEST,null,'No configuration found');  
        }
        return responseApi(res, HTTPStatus.OK,configuration,'Created successfully');
    }catch (err) {
        console.error(err.message)
        if (err) next(err);
      }
}



export const  fetchList = async (req, res, next)=> {
    try{
        const configurations = await Configuration.findAll({where: {}});
        if(configurations.length < 1){
            return responseApi(res, HTTPStatus.NO_CONTENT,null,'No configurations found');  
        }
        return responseApi(res, HTTPStatus.OK,configurations,'configurations found successfully');
    }catch (err) {
        console.error(err.message)
        if (err) next(err);
      }
}
