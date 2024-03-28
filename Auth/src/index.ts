import { app } from "./app";
require ("dotenv").config();
import  config  from "config";
import { log } from "./utils/logger";
import { dbConnect } from "./utils/connectToDb";

const port = config.get<string>("port");

app.listen(port, () => {
    dbConnect();
    log.info(`Connected on http://localhost:${port} `)
})