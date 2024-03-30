import {Request, Response}  from "express";
import express from "express";
import { validationResult, body } from "express-validator";
import { log } from "../utils/logger";
import  config  from "config";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { RequestValidationError } from "../errors/requestValidationError";
import { BadRequestError } from "../errors/BadRequestError";

const signupRouter = express.Router();

signupRouter.post("/api/users/signup", 
[
  body('email', 'Email not valid')
     .isEmail(),
  body('password', 'password must be between 4 and 20 character')
     .isLength({min: 4, max: 20})
     .trim()
],
 async(req: Request, res: Response) => {

  const errors = validationResult(req);

   if(!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

   const { email, password} = req.body;

   const existingUser = await User.findOne({ email })

  if(existingUser) {
   throw new BadRequestError('Email in use')
  }

  const user = User.build({ email, password})
  await user.save();

  //Generate JWT
  const secret = config.get('SECRET')
 const userJwt = jwt.sign({
   id: user.id,
   email: user.email
 }, 'secret');

  //Store it in a session
  req.session = {
    jwt: userJwt
  };

  res.status(201).send(user)
 
});

export { signupRouter };