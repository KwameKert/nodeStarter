import * as SenderController from '../sender.controller';
import {Sender, Users} from '../../../db/models';
import HTTPStatus from 'http-status';
import {buildNext, buildReq, buildRes, returnExpectations} from '../../../utils/test-helpers'

var user = null;
beforeEach(async () => {
    jest.resetAllMocks();
    user =  await Users.create({email: 'kwames@gmail.com',  username: 'kwamekert', password: 'password'});
    await Sender.destroy({ where: {} });
})


afterAll(async()=>{
    await Users.destroy({ where: {} });
})


  describe('Sender Creation', () => {
    test('sender create  should return 200', async () => {

        let req = buildReq({body: {name: 'AG AUTH',  status: 'active', UserId: user.id}});
        let res = buildRes();
        let nxtFxn = buildNext();
    
        await SenderController.create(req, res, nxtFxn);
       returnExpectations(res, HTTPStatus.CREATED);
     
      });
      
      
      test('sender create  should return 400', async () => {
        let req = buildReq({body: {name: 'AG AUTH',  status: 'active'}});
        let res = buildRes();
        let nxtFxn = buildNext();
    
        await SenderController.create(req, res, nxtFxn);
       returnExpectations(res, HTTPStatus.BAD_REQUEST);
     
      });

      test('sender create duplicate should return 400', async () => {

        await Sender.create({name: 'AG AUTH',  status: 'active', UserId: user.id});

        let req = buildReq({body: {name: 'AG AUTH',  status: 'active', UserId: user.id}});
        let res = buildRes();
        let nxtFxn = buildNext();
    
        await SenderController.create(req, res, nxtFxn);
       returnExpectations(res, HTTPStatus.BAD_REQUEST);
     
      });
    });


    describe('Sender List', () => {

 
        test('sender list  should return 200', async () => {
            await Sender.create({name: 'AG AUTH',  status: 'active', UserId: user.id})
            await Sender.create({name: 'AG AUT',  status: 'active', UserId: user.id})

            let req = buildReq();
            let res = buildRes();
            let nxtFxn = buildNext();
        
            await SenderController.fetchList(req, res, nxtFxn);
           returnExpectations(res, HTTPStatus.OK);
         
          });
          
          
          test('sender list by user should return 200', async () => {

            await Sender.create({name: 'AG AUTH',  status: 'active', UserId: user.id});
            await Sender.create({name: 'AG AUT',  status: 'active', UserId: user.id});

            let req = buildReq({params: {id: user.id}});
            let res = buildRes();
            let nxtFxn = buildNext();
        
            await SenderController.fetchListByUser(req, res, nxtFxn);
           returnExpectations(res, HTTPStatus.OK);
         
          });
        });