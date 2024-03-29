import {Request, Response}  from "express";
import express from "express";
import { validationResult, body } from "express-validator";
import { log } from "../utils/logger";
import { RequestValidationError } from "../errors/requestValidationError";
import { databaseConnectionError } from "../errors/databaseConnectionError";

const signupRouter = express.Router();

signupRouter.post("/api/users/signup", 
[
  body('email', 'Email not valid')
     .isEmail(),
  body('password', 'password must be between 4 and 20 character')
     .isLength({min: 4, max: 20})
     .trim()
],
 (req: Request, res: Response) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  log.info('Creating a user...')

  throw new databaseConnectionError();

   res.send({})
  
});

export { signupRouter };