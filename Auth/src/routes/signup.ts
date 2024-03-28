import {Request, Response}  from "express";
import express from "express";
import { validationResult } from "express-validator";
import { signupValidator } from "../validator/signup.validator";
import { log } from "../utils/logger";
import { RequestValidationError } from "../errors/requestValidationError";
import { databaseConnectionError } from "../errors/databaseConnectionError";

const signupRouter = express.Router();

signupRouter.post("/api/users/signup",
signupValidator,
 (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    log.info("creating user...")
    throw new databaseConnectionError();

    res.send({})
  
});

export { signupRouter };