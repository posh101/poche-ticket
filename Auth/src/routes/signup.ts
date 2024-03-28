import {Request, Response}  from "express";
import express from "express";
import { validationResult } from "express-validator";
import { signupValidator } from "../validator/signup.validator";
import { log } from "../utils/logger";

const signupRouter = express.Router();

signupRouter.post("/api/users/signup",
signupValidator,
 (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      throw new Error("Invalid email or pasword")
    }

    log.info("creating user...")
    throw new Error("Error connecting to database")

    res.send({})
  
});

export { signupRouter };