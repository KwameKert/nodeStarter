import * as PaymentController from '../payment.controller';
import {Configuration,Payment, Users} from '../../../db/models';
import HTTPStatus from 'http-status';
import {buildNext, buildReq, buildRes, clearUsers, createNewUser, returnExpectations} from '../../../utils/test-helpers'
var user = null;
var configuration = null;

beforeAll(async()=>{
    
   user =  await Users.create({email: 'kwames@gmail.com',  username: 'kwamekert', password: 'password'});
  
   configuration = await Configuration.create( {name: 'SMS GLOBAL',  user: 'kwamekert', password: 'password', apiKey: '23asdf23423', stat: 'active', creditsToDispense: 100, company: 'SMS_GLOBAL'});
})

beforeEach(async () => {
    jest.resetAllMocks();
   await Payment.destroy({ where: {} });
}); 

afterAll(async ()=>{
     await Users.destroy({where: {}});
     await Configuration.destroy({where: {}})
})



describe('Payment Creation Test', () => {
    test('payment create  should return 200', async () => {
      
      let req = buildReq({body: {userId: user.id, configurationId: configuration.id, creditAmount: 90}});
       // let req = buildReq({body: {userId: 4, configurationId: 4, creditAmount: 90}});
        let res = buildRes();
        let nxt = buildNext();

        await PaymentController.create(req, res, nxt);
      //  console.log(res)
        returnExpectations(res,HTTPStatus.CREATED)

    });


    test('payment create  should return 403', async () => {
      
      let req = buildReq({body: {userId: user.id, configurationId: configuration.id, creditAmount: 900}});
       // let req = buildReq({body: {userId: 4, configurationId: 4, creditAmount: 90}});
        let res = buildRes();
        let nxt = buildNext();

        await PaymentController.create(req, res, nxt);
      //  console.log(res)
        returnExpectations(res,HTTPStatus.FORBIDDEN)

    });


    test('payment create  should return 400 with no user', async () => {
      
        let req = buildReq({body: {userId:6, configurationId: configuration.id, creditAmount: 90}});
         // let req = buildReq({body: {userId: 4, configurationId: 4, creditAmount: 90}});
          let res = buildRes();
          let nxt = buildNext();
  
          await PaymentController.create(req, res, nxt);
        //  console.log(res)
          returnExpectations(res,HTTPStatus.BAD_REQUEST)
  
      });

      test('payment create  should return 400 with no configuration', async () => {
      
        let req = buildReq({body: {userId:user.id, configurationId: 4, creditAmount: 90}});
         // let req = buildReq({body: {userId: 4, configurationId: 4, creditAmount: 90}});
          let res = buildRes();
          let nxt = buildNext();
  
          await PaymentController.create(req, res, nxt);
        //  console.log(res)
          returnExpectations(res,HTTPStatus.BAD_REQUEST)
  
      });


});


describe('Payment Fetch ', () => {
    test('payment fetch should return 200', async () => {
      
        await Payment.create({UserId: user.id, ConfigurationId: configuration.id, creditAmount: 90});
        await Payment.create({UserId: user.id, ConfigurationId: configuration.id, creditAmount: 70});

      let req = buildReq();
       // let req = buildReq({body: {userId: 4, configurationId: 4, creditAmount: 90}});
        let res = buildRes();
        let nxt = buildNext();

        await PaymentController.fetchListAll(req, res, nxt);
      //  console.log(res)
        returnExpectations(res,HTTPStatus.OK)

    });


    test('payment fetch by user should return 200', async () => {
      
        await Payment.create({UserId: user.id, ConfigurationId: configuration.id, creditAmount: 90});
        await Payment.create({UserId: user.id, ConfigurationId: configuration.id, creditAmount: 70});
    
          let req = buildReq({params: {id: user.id}});
           // let req = buildReq({body: {userId: 4, configurationId: 4, creditAmount: 90}});
            let res = buildRes();
            let nxt = buildNext();
    
            await PaymentController.fetchListByUser(req, res, nxt);
          //  console.log(res)
            returnExpectations(res,HTTPStatus.OK)
    
        });



        test('payment fetch by configuration should return 200', async () => {
      
            await Payment.create({UserId: user.id, ConfigurationId: configuration.id, creditAmount: 90});
            await Payment.create({UserId: user.id, ConfigurationId: configuration.id, creditAmount: 70});
        
              let req = buildReq({params: {id:configuration.id}});
               // let req = buildReq({body: {userId: 4, configurationId: 4, creditAmount: 90}});
                let res = buildRes();
                let nxt = buildNext();
        
                await PaymentController.fetchListByConfiguration(req, res, nxt);
              //  console.log(res)
                returnExpectations(res,HTTPStatus.OK)
        
            });



});

