import { Users, Message, Sender } from "../../../db/models";
import HTTPStatus from "http-status";

import app from "../../../app";
import request from "supertest";

var token ;
var UserId;
var sender;
beforeAll(async function (done) {
    const user = await Users.create( {email: 'kwames@gmail.com',  username: 'test', password: 'password', 'apiKey':'234jnkl234'})
    sender = await Sender.create({name: 'CHAPELFY',UserId: user.id,status: 'active'});
  
    const {body} = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'test',
      password: 'password',
    });

    token = body.apiKey;
    UserId = body.id;

    done();
});



afterAll(async (done)=>{
 await Users.destroy({ where: {} });
 await Sender.destroy({where: {}});
 done();
})



describe("Make Message ::Routes", () => {
    // test("should create message successfully", async () => {
   
    //    // console.log("configuraiton here now", configuration)
    //   const response = await request(app)
    //     .post("/api/message/")
    //    .set("Authorization", "Bearer " + token)
    //     .send({type: 'SMS',  senderId: sender.name, destination: '233244151506', text: 'Hello there, testing going'});
    //    // console.log(response)
    //    expect(response.statusCode).toBe(HTTPStatus.CREATED);
    //     expect(response.body).toHaveProperty('data');
    //     expect(response.body).toHaveProperty('message');
    // });

    test("should not create message successfully", async () => {
       const response = await request(app)
         .post("/api/message/")
         .send({type: 'SMS',  senderId: sender.name, destination: '233244151506', text: 'Hello there, testing going'});
        
        expect(response.statusCode).toBe(HTTPStatus.UNAUTHORIZED);
     });
 

     test("should not create message successfully", async () => {
        const response = await request(app)
          .post("/api/message/")
          .set("Authorization", "Bearer " + token)
          .send({type: 'SMS',  destination: '233244151506', text: 'Hello there, testing going'});
         
         expect(response.statusCode).toBe(HTTPStatus.BAD_REQUEST);
      });

    
    
  
});

