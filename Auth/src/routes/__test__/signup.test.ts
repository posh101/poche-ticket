import request from "supertest";
import { app } from "../../app";
import "express-async-errors";


describe("Signup", () => {

    test('should return a 201 on successful signup',
    async () => {
    const res = request(app)
    .post('/api/users/signup')
    .send({
       email: 'test@test.com',
       password: 'password'
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .expect('post')
 });

 test('should return a 400 with an invalid email and password',
     () => {
    const res = request(app)
    .post('/api/users/signup')
    .send({
       email: 'testtesthhjj',
       password: 'password'
    })
    .expect("Content-Type", /json/)
    .expect(400)
    .expect('post');

     const response = request(app)
    .post('/api/users/signup')
    .send({
       email: 'test@test.com',
       password: 'p'
    })
    .expect("Content-Type", /json/)
    .expect(400)
    .expect('post')
 });

 test(" Should disallow duplicate email ", () => {
    const res = request(app)
    .post('/api/users/signup')
    .send({
       email: 'test@test.com',
       password: 'password'
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .expect('post');

    const response = request(app)
    .post('/api/users/signup')
    .send({
       email: 'test@test.com',
       password: 'password'
    })
    .expect("Content-Type", /json/)
    .expect(400)
    .expect('post')
 });

 test(" Should set a cookie after successful signup ",
   async () => {
    const response = request(app)
    .post('/api/users/signup')
    .send({
       email: 'test@test.com',
       password: 'password'
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .expect('post');
   });
});