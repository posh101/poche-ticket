import { NextFunction, Request, Response } from "express"
import { log } from "../utils/logger"

export const errorHandler = (
err: Error, 
req: Request,
res: Response, 
next: NextFunction) => {
  
    log.info("something went wrong")

    res.status(400).send({Message:  err.message})

}