import request from "supertest";
import { app } from "../../app";
import "express-async-errors";


describe("Signin", () => {

    test('should fail when an email that does not exist is supplied',
    async () => {
    const res = request(app)
    .post('/api/users/signin')
    .send({
       email: 'test@test.com',
       password: 'password'
    })
    .expect("Content-Type", /json/)
    .expect(400)
    .expect('post')
 });

 it('Should fail when an invalid password is supplied', () => {
    const res = request(app)
    .post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .expect('post')

    const response = request(app)
    .post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "hdjjsksooe"
    })
    .expect("Content-Type", /json/)
    .expect(400)
    .expect('post')
 });

 it('Should ensure the signup credentials and signin credentials are the same', () => {
    const res = request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .expect('post')

    const response = request(app)
    .post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .expect('post')
 })

});