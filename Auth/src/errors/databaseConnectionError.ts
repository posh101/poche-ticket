import { ValidationError } from "express-validator";

export class databaseConnectionError extends Error {
    reason = " Error connecting to database"
    constructor() {
        super();

        Object.setPrototypeOf(this, databaseConnectionError.prototype)
    }
}