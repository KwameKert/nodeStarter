import { clearUsers } from "../../../utils/test-helpers";
import { Users } from "../../../db/models";
import HTTPStatus from "http-status";

import app from "../../../app";
import request from "supertest";

let token ;
beforeAll(async function (done) {

    const {body} = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'test',
      password: 'password',
    });

    token = body.token;
    done();
});


afterAll(async (done)=>{
 await Users.destroy({ where: {} });
 done();
})

describe("Get User::Routes", () => {
    test("should fetch  user by successfully", async () => {
   
      const response = await request(app)
        .get("/api/user/366")
       .set("Authorization", "Bearer " + token)
        .send();
 
       expect(response.statusCode).toBe(HTTPStatus.OK);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('username');
    });
  
      test('should throw 400 no user found  ', async () => {
       
        const response = await request(app)
        .get("/api/user/36")
       .set("Authorization", "Bearer " + token)
        .send();
 
       expect(response.statusCode).toBe(HTTPStatus.BAD_REQUEST);
        
      });


      test("should fetch all users successfully", async () => {
   
        const response = await request(app)
          .get("/api/user/")
         .set("Authorization", "Bearer " + token)
          .send();
   
         expect(response.statusCode).toBe(HTTPStatus.OK);
        //   expect(response.body).t('id');
        //   expect(response.body).toHaveProperty('username');
      });
});





   