import { CustomError } from "./customError";

export class databaseConnectionError extends CustomError {
    statusCode = 500;
    reason = " Error connecting to database"
    constructor() {
        super('Error connecting to db');

        Object.setPrototypeOf(this, databaseConnectionError.prototype)
    }

    serializeErrors() {
        return [
            { message: this.reason}
        ]
    }
}