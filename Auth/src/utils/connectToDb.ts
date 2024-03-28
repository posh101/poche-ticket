import mongoose from "mongoose";
import config  from "config";
import { log } from "../utils/logger"

const dbConnect = async () => {
    const dbUri = config.get<string>("dbUri");
    try
    {
       await mongoose.connect(dbUri);
       log.info("Connected to DB")
    }catch(err) {
       console.log(err)
    }
}

export { dbConnect };