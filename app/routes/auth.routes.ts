import express from "express";
import verifySignUp from '../middlewares/auth/verifySignUp';
import {signin, signup} from "../controllers/auth/auth.controller";

module.exports = function(app: express.Express) {
    app.use(function(req: any, res: any, next: any) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateEmail,
            verifySignUp.checkRolesExisted
        ],
        signup
    );

    app.post("/api/auth/signin", signin);
};