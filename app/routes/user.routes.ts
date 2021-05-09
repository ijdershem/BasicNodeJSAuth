import express from "express";
import authJwt from '../middlewares/auth/authJwt';
import { allAccess, userBoard, adminBoard, moderatorBoard } from "../controllers/auth/user.controller";

module.exports = function(app: express.Express) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], userBoard);

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        adminBoard
    );
};