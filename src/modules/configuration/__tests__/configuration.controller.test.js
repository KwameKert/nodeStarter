import * as ConfigurationController from '../configuration.controller';
import {Configuration} from '../../../db/models';
import HTTPStatus from 'http-status';
import {buildNext, buildReq, buildRes, createNewUser, returnExpectations} from '../../../utils/test-helpers'


beforeEach(async () => {
    jest.resetAllMocks();
    await Configuration.destroy({ where: {} });
   
})



  describe('Configuration  Test', () => {
    test('configuration create  should return 200', async () => {

        let req = buildReq({body: {name: 'SMS GLOBAL',  user: 'kwamekert', password: 'password', apiKey: '23asdf23423', status: 'active', url: 'http://test.com', company: 'SMS_GLOBAL'}});
        let res = buildRes();
        let nxtFxn = buildNext();
    
        await ConfigurationController.create(req, res, nxtFxn);
       returnExpectations(res, HTTPStatus.CREATED);
     
      });


      test('configuration fetch  should return 200', async () => {
          await Configuration.create({
            name: 'SMS GLOBAL',  
            user: 'kwamekert', 
            password: 'password',
            apiKey: '23asdf23423', 
            status: 'active'
          })

        let req = buildReq();
        let res = buildRes();
        let nxtFxn = buildNext();
    
        await ConfigurationController.fetchList(req, res, nxtFxn);
       returnExpectations(res, HTTPStatus.OK);
     
      });


      test('configuration fetch  should return 204', async () => {

        let req = buildReq();
        let res = buildRes();
        let nxtFxn = buildNext();
    
        await ConfigurationController.fetchList(req, res, nxtFxn);
       returnExpectations(res, HTTPStatus.NO_CONTENT);
     
      });


      test('configuration update  should return 200', async () => {

      const {id} =   await Configuration.create({
            name: 'SMS GLOBAL',  
            user: 'kwamekert', 
            password: 'password',
            apiKey: '23asdf23423', 
            status: 'active'
          })
        let req = buildReq({body: {user: 'dennis', id, status: 'active'}});
        let res = buildRes();
        let nxtFxn = buildNext();
    
        await ConfigurationController.update(req, res, nxtFxn);
       returnExpectations(res, HTTPStatus.OK);
     
      });


      test('configuration update  should return 400', async () => {

          let req = buildReq({body: {user: 'dennis', id: 8}});
          let res = buildRes();
          let nxtFxn = buildNext();
      
          await ConfigurationController.update(req, res, nxtFxn);
         returnExpectations(res, HTTPStatus.BAD_REQUEST);
       
        });


    });
