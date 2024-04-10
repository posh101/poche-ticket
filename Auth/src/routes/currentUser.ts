import express from "express";
import { currentUser } from "../middlewares/current-user";

const currentUserRouter = express.Router();

currentUserRouter.get("/api/users/currentUser",
currentUser,
(req, res) => {
    res.send({currentuser: req.currentUser || null})
});

export { currentUserRouter };