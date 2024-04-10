import { CustomError } from "./customError";

export class NotAuthorizedError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Not Authorized');
      
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors() {
       return [{ message: "Not Authorized "}];
    }
}