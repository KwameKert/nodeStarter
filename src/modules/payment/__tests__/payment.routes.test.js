import { Users, Payment, Configuration } from "../../../db/models";
import HTTPStatus from "http-status";

import app from "../../../app";
import request from "supertest";

var token ;
var UserId;
var configuration;
beforeAll(async function (done) {
    await Users.create( {email: 'kwames@gmail.com',  username: 'test', password: 'password', 'apiKey':'234jnkl234'})
    configuration = await Configuration.create( {name: 'SMS GLOBAL',  user: 'kwamekert', password: 'password', apiKey: '23asdf23423', stat: 'active'});
  
    const {body} = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'test',
      password: 'password',
    });

    token = body.token;
    UserId = body.id;

    await Payment.create({userId:UserId, configurationId: configuration.id, creditAmount: 90});
    await Payment.create({userId:UserId, configurationId: configuration.id, creditAmount: 30})
    await Payment.create({userId:UserId, configurationId: configuration.id, creditAmount: 50})

    done();
});



afterAll(async (done)=>{
 await Users.destroy({ where: {} });
 await Configuration.destroy({where: {}});
 done();
})



describe("Make Payment ::Routes", () => {
    test("should create payment successfully", async () => {
   
       // console.log("configuraiton here now", configuration)
      const response = await request(app)
        .post("/api/payment")
       .set("Authorization", "Bearer " + token)
        .send({userId:UserId, configurationId: configuration.id, creditAmount: 90});
       // console.log(response)
       expect(response.statusCode).toBe(HTTPStatus.CREATED);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('message');
    });

    test("should throw error Configuration does not exist ", async () => {
       const response = await request(app)
         .post("/api/payment")
        .set("Authorization", "Bearer " + token)
         .send({userId:UserId, configurationId: 8, creditAmount: 90});
        
        expect(response.statusCode).toBe(HTTPStatus.BAD_REQUEST);
         expect(response.body).toHaveProperty('data');
         expect(response.body.message).toBe('Configuration does not exist');
     });


     test("should throw error User does not exist ", async () => {
        const response = await request(app)
          .post("/api/payment")
         .set("Authorization", "Bearer " + token)
          .send({userId:5, configurationId: configuration.id, creditAmount: 90});
         
         expect(response.statusCode).toBe(HTTPStatus.BAD_REQUEST);
          expect(response.body).toHaveProperty('data');
          expect(response.body.message).toBe('User does not exist');
      });
 
    
  
});




describe("List Payment ::Routes", () => {
    test("should create fetch all payment", async () => {
   

      const response = await request(app)
        .get("/api/payment")
       .set("Authorization", "Bearer " + token)
        .send();
   
       expect(response.statusCode).toBe(HTTPStatus.OK);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('message');
    });

    test("should create fetch all payment by user ", async () => {
       const response = await request(app)
         .get(`/api/payment/user/${UserId}`)
        .set("Authorization", "Bearer " + token)
         .send();
        
        expect(response.statusCode).toBe(HTTPStatus.OK);
         expect(response.body).toHaveProperty('data');
         expect(response.body).toHaveProperty('message');
     });


     test("should create fetch all payment by configuration ", async () => {
        const response = await request(app)
          .get(`/api/payment/configuration/${configuration.id}`)
         .set("Authorization", "Bearer " + token)
          .send();
         
         expect(response.statusCode).toBe(HTTPStatus.OK);
          expect(response.body).toHaveProperty('data');
          expect(response.body).toHaveProperty('message');
      });

  
    
  
});