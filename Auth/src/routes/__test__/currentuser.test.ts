import request from "supertest";
import { app } from "../../app";
import "express-async-errors";
import { log } from "../../utils/logger";


describe("Current-User", () => {

    test('should respond to details about the current user',
    async () => {
    
    const cookie = await global.signin();

    const response =  await request(app)
    .post("api/users/currentUser")
    .set('Cookie', cookie)
    .send()
    .expect(200)

    expect(response.body.currentUser.email).toEqual('test@test.com')

 });

 test('should respond with null if not authenticated', async () => {
    const response = await request(app)
    .post("api/users/currentUser")
    .send()
    .expect(200)

    expect(response.body.currentUser).toEqual(null);
 })

});