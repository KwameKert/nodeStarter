import { clearUsers } from "../../../utils/test-helpers";
import { Users, Sender } from "../../../db/models";
import HTTPStatus from "http-status";

import app from "../../../app";
import request from "supertest";

let token ;
let userId;
beforeAll(async function (done) {

    await Users.create( {email: 'kwames@gmail.com',  username: 'test', password: 'password', 'apiKey':'234jnkl234'})

    const {body} = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'test',
      password: 'password',
    });

    token = body.token;
    userId = body.id;
    done();
});

beforeEach(async function(done){
    await Sender.destroy({where: {}});
    done();
})


afterAll(async (done)=>{
 await Users.destroy({ where: {} });
 done();
})



describe("Create Sender::Routes", () => {
    test("should create sender successfully", async () => {
      const response = await request(app)
        .post("/api/sender")
       .set("Authorization", "Bearer " + token)
        .send({name: 'AG AUTH',  status: 'active', UserId: userId});
 
       expect(response.statusCode).toBe(HTTPStatus.CREATED);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('message');
    });


    test("should fetch user sender successfully", async () => {

        await Sender.create({name: 'AG AUT',  status: 'active', UserId: userId});
        await Sender.create({name: 'AG AUTH',  status: 'active', UserId: userId});
        const response = await request(app)
          .get(`/api/sender/user/${userId}`)
         .set("Authorization", "Bearer " + token)
          .send();
   
         expect(response.statusCode).toBe(HTTPStatus.OK);
          expect(response.body).toHaveProperty('data');
          expect(response.body).toHaveProperty('message');
      });
    
  
});

