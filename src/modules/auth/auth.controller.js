import {Users} from '../../db/models';
import HTTPStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';

//const {Users}  = model;

export const register = async (req, res, next) => {
    try {

       let apiKey = uuidv4()
       if(await doesUsernameExists(req.body.username) != null){
        return res.status(HTTPStatus.BAD_REQUEST).send({message: 'Username already exist'})
       }

       if(await doesEmailExists(req.body.email) != null){
        return res.status(HTTPStatus.BAD_REQUEST).send({message: 'Email already exist'})
       }
      const user = await Users.create({
        username: req.body.username,
        password:req.body.password,
        email: req.body.email,
        apiKey,
        ConfigurationId: req.body.ConfigurationId
      });
     
      return res.status(HTTPStatus.CREATED).send(user);
    } catch (err) {
      console.error(err.message)
      if (err) next(err);
    }
  };


  export const login = async (req, res, next)=>{
    try{
      
      const user = await Users.findOne({where: {username: req.body.username}});
      if(!user || !user.authenticate(req.body.password)){
        return res.status(HTTPStatus.BAD_REQUEST).send({ message: 'Invalid credentials' });
      }
      const u = user.auth();
      await Users.update({lastLoginAt: Date.now()}, {where: {
        username: req.body.username
      }})
      return res.status(HTTPStatus.ACCEPTED).send(u);
    } catch (err) {
      console.error(err.message)
      if (err) next(err);
    }
  }




async function doesUsernameExists(username){
    return  await Users.findOne({where:{username} })
}

async function doesEmailExists(email){
  return  await Users.findOne({where:{email} })
}