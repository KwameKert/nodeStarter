import { clearUsers } from "../../../utils/test-helpers";
import { Users, Configuration } from "../../../db/models";
import HTTPStatus from "http-status";

import app from "../../../app";
import request from "supertest";

let token ;
beforeAll(async function (done) {

    await Users.create( {email: 'kwames@gmail.com',  username: 'test', password: 'password', 'apiKey':'234jnkl234'})

    const {body} = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'test',
      password: 'password',
    });

    token = body.token;
    done();
});

beforeEach(async function(done){
    await Configuration.destroy({where: {}});
    done();
})


afterAll(async (done)=>{
 await Users.destroy({ where: {} });
 done();
})



describe("Create User::Routes", () => {
    test("should create configuration successfully", async () => {
   
      const response = await request(app)
        .post("/api/configuration")
       .set("Authorization", "Bearer " + token)
        .send({name: 'SMS GLOBAL',  user: 'kwamekert', password: 'password', apiKey: '23asdf23423', status: 'active'});
 
       expect(response.statusCode).toBe(HTTPStatus.CREATED);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('message');
    });

    
  
});



describe("Get User::Routes", () => {
test("should fetch  configuration successfully", async () => {
    const configuration = await Configuration.create({
        name: 'SMS GLOBAL',  
        user: 'kwamekert', 
        password: 'password',
        apiKey: '23asdf23423', 
        status: 'active'
    });
   
    const response = await request(app)
      .get(`/api/configuration/${configuration.id}`)
     .set("Authorization", "Bearer " + token)
      .send();

     expect(response.statusCode).toBe(HTTPStatus.OK);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
  });


  test("should fetch  configuration unsuccessfully", async () => {
    

    const response = await request(app)
      .get(`/api/configuration/1`)
     .set("Authorization", "Bearer " + token)
      .send();

     expect(response.statusCode).toBe(HTTPStatus.BAD_REQUEST);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
  });


});

describe("Fetch list User::Routes", () => {


    test("should fetch all configurations successfully", async () => {
        await Configuration.create({
            name: 'SMS GLOBAL',  
            user: 'kwamekert', 
            password: 'password',
            apiKey: '23asdf23423', 
            status: 'active'
        });

        await Configuration.create({
            name: 'SMS GLOBAL',  
            user: 'kwamekert', 
            password: 'password',
            apiKey: '23asdf23423', 
            status: 'active'
        });

        const response = await request(app)
          .get(`/api/configuration`)
         .set("Authorization", "Bearer " + token)
          .send();
   
          expect(response.statusCode).toBe(HTTPStatus.OK);
          expect(response.body).toHaveProperty('data');
          expect(response.body.data).toEqual(
            expect.arrayContaining([
              expect.objectContaining({name: 'SMS GLOBAL'})
            ])
          );
         // expect(response.body).toHaveProperty('message');
      });

      test("should fetch all configurations unsuccessfully", async () => {
     

        const response = await request(app)
          .get(`/api/configuration`)
         .set("Authorization", "Bearer " + token)
          .send();
   
          console.log(response.body);
          expect(response.statusCode).toBe(HTTPStatus.NO_CONTENT);
         
          
         // expect(response.body).toHaveProperty('message');
      });

});


describe("Update Configuration::Routes", () => {
    test("should update  configuration successfully", async () => {
        const config = await Configuration.create({
            name: 'SMS GLOBAL',  
            user: 'kwamekert', 
            password: 'password',
            apiKey: '23asdf23423', 
            status: 'active'
        });

        const response = await request(app)
          .put(`/api/configuration`)
         .set("Authorization", "Bearer " + token)
          .send({name: 'ROutee', id: config.id});
   
          expect(response.statusCode).toBe(HTTPStatus.OK);
          expect(response.body).toHaveProperty('data');
          expect(response.body.data).toHaveProperty('user');
          expect(response.body.data.name).toBe('ROutee');
    });

    test("should update  configuration unsuccessfully", async () => {
       
        const response = await request(app)
          .put(`/api/configuration`)
         .set("Authorization", "Bearer " + token)
          .send({name: 'ROutee', id: 4});
   
          expect(response.statusCode).toBe(HTTPStatus.BAD_REQUEST);
    });
});