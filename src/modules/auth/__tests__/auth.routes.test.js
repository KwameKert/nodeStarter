import HTTPStatus from 'http-status';
import request from 'supertest';
import {clearUsers} from '../../../utils/test-helpers';
import {Users} from '../../../db/models';
import app from '../../../app';
//const url = "/api/auth"


beforeEach(async () => {
    //  await clearUsers();
});
describe('Auth::Routes', async () => {


    test('should login successfully', async () => {
        await Users.create({
            username: 'test',
            email: 'test@gmail.com',
            apiKey: '23423423a42asdf3asdf',
            password: 'password',
        });

        const res = await request(app).post('/api/auth/login').send({
            username: 'test',
            password: 'password',
        });

        expect(res.statusCode).toBe(HTTPStatus.ACCEPTED);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('token');
    });


    test('should throw invalid errors ', async () => {
        await Users.create({
            username: 'test',
            email: 'test@gmail.com',
            apiKey: '23423423a42asdf3asdf',
            password: 'password',
        });

        const res = await request(app).post('/api/auth/login').send({
            username: 'test',
            password: 'pasword',
        });

        expect(res.statusCode).toBe(HTTPStatus.BAD_REQUEST);
    });
});

