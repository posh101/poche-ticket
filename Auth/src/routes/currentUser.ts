import express from "express";

const currentUserRouter = express.Router();

currentUserRouter.post("/api/users/currentUser", () => {

});

export { currentUserRouter };