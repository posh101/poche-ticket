import request from "supertest";
import { app } from "../../app";
import "express-async-errors";
import { log } from "../../utils/logger";


describe("Signin", () => {

    test('should clear the cookie after signing out',
    async () => {
    const res = request(app)
    .post('/api/users/signout')
    .send({
       email: 'test@test.com',
       password: 'password'
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .expect('post')

    const response =  request(app)
    .post("api/users/signout")
    .send({})
    .expect(200)

    log.info(response.get('Set-Cookie'));
 });

});