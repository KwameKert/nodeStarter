import {Users} from '../../db/models';
import HTTPStatus from 'http-status';


export const gellAllUsers= async (req, res, next) =>{
    try{
      let users = await Users.findAll();
      if(users.length < 1){
        return res.status(HTTPStatus.NO_CONTENT).send({ message: 'UserS not found' });
      }
      return res.status(HTTPStatus.OK).send(users);
    }catch (err) {
      console.error(err.message)
      if (err) next(err);
    }
}


export const gellUser= async (req, res, next) =>{
  try{
  //  console.log("got here suce");
    let id = req.params.id;
    let user = await Users.findByPk(id);
    if(!user){
    //  console.log("errrorrrr")
      return res.status(HTTPStatus.BAD_REQUEST).send({ message: 'No user found ' });
    }
    console.log("user here: ", user.username)
   // next();
    return res.status(HTTPStatus.OK).send(user);
  }catch (err) {
    console.error(err.message)
    if (err) next(err);
  }
}

export const getBalance= async (req, res, next) =>{
  try{
   
    let balance = req.user.creditBalance;

   // next();
    return res.status(HTTPStatus.OK).send({balance: balance});
  }catch (err) {
    console.error(err.message)
    if (err) next(err);
  }
}