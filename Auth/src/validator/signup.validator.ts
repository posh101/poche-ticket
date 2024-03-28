import { check } from "express-validator";

export const signupValidator = [
    check('email must be valid').isEmail(),
    check('password must be between 4 and 20 characters').isLength({min: 4, max: 20}).trim()
]