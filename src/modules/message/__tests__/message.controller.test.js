import * as MessageController from '../message.controller';
import {Sender, Users, Configuration} from '../../../db/models';
import axios from "axios";
import HTTPStatus from 'http-status';
import {buildNext, buildReq, buildRes, returnExpectations} from '../../../utils/test-helpers'

var user ;
var sender ;
var configuration ;
beforeEach(async () => {
    jest.resetAllMocks();
    configuration = await Configuration.create( {name: 'ROUTEE',  user: 'kwamekert', password: 'password', apiKey: 'ae36521a-3cef-4407-aa2b-0d7bdc1960d2', stat: 'active', creditsToDispense: 100, company: 'ROUTEE', url: "https://connect.routee.net/sms"});
    user =  await Users.create({email: 'kwames@gmail.com',ConfigurationId: configuration.id,  username: 'kwamekert', password: 'password'});
    sender = await Sender.create({name: 'CHAPELFY',UserId: user.id,status: 'active'});
   
});


afterAll(async()=>{
    await Users.destroy({ where: {} });
    await Sender.destroy({ where: {} });
});

jest.mock('axios');

describe('Sender Creation', () => {

    test('sender create  should return 200', async () => {
//              User.findOne = jest.fn().mockResolvedValue({
//         ...newUser,
// 	 phone: '0570512078',     
// 	 verificationCode: '123432',
// 	 _id: '5dbff32e367a343830cd2f49',
// 	 isActivated: false,    
//         __v: 0
//     }
// )

//axios.get.mockResolvedValue({data: "OK VALUE"});
       // console.log(user)
        let req = buildReq({body: {type: 'SMS',  senderId: sender.name, destination: '+233244151506', text: 'Hello there, testing going'}, user});
        let res = buildRes();
        let nxtFxn = buildNext();
        await MessageController.create(req, res, nxtFxn);
       returnExpectations(res, HTTPStatus.CREATED);
      });


      test.skip('sender create  should return 400 for no sender id', async () => {
          //setup 
          axios.get.mockResolvedValue({data: "OK VALUE"});
         
        let req = buildReq({body: {type: 'SMS',   destination: '233244151506', text: 'Hello there, testing going'}});
        let res = buildRes();
        let nxtFxn = buildNext();
        await MessageController.create(req, res, nxtFxn);
       returnExpectations(res, HTTPStatus.BAD_REQUEST);
      });


      
});