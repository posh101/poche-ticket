import request from "supertest";
import { app } from "../app";
import "express-async-errors";

declare global {
    function signin(): Promise<string>;
}

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const res = request(app)
    .post('/api/users/signup')
    .send({
       email, password
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .expect('post')

    const cookie = res.get('Set-Cookie');

    return cookie;
};