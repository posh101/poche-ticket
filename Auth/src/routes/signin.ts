import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Password } from "../services/password";
import { validateRequest } from "../middlewares/validateRequest";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import  config  from "config";
import { BadRequestError } from "../errors/BadRequestError";

const signinRouter = express.Router();

signinRouter.post("/api/users/signin", 
[
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password', 'Invalid password')
    .trim()
    .notEmpty()
    .withMessage('Invalid password')
],
validateRequest,
async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email });
  if(!existingUser) {
    throw new BadRequestError('Invalid credentials')
  }
  
  const passwordsMatch = await Password.compare(
     existingUser.password,
     password
  );
    if(!passwordsMatch) {
        throw new BadRequestError('Invalid credentials')
    }
     
    const secret = config.get('SECRET')
    const jwtUser = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, 'secret'
    );

    req.session = {
      jwt: jwtUser
    };

    res.status(200).send(existingUser);
 }
);

export { signinRouter };