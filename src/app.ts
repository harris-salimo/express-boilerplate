import "reflect-metadata";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import path from "path";
import { RateLimiterMemory } from "rate-limiter-flexible";
// import csrf from 'csrf';

import cors from "cors";
import helmet from "helmet";
import { passport } from "./config/passport";
import { AppDataSource } from "./data-source";
import indexRouter from "./router";
import usersRouter from "./router/users";

// TODO: complete this step to prevent brute-force attacks against authorization
const opts = {
    points: 6, // 6 points
    duration: 1, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

const app = express();

app.use(helmet());
app.use(cors());
app.disable("x-powered-by");
app.use(logger("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(new csrf({}));

const initDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Connection established");
    } catch (error) {
        console.error(error);
    }
};

initDB();

app.use("/", passport.authenticate("jwt", { session: false }), indexRouter);
app.use(
    "/users",
    passport.authenticate("jwt", { session: false }),
    usersRouter
);

// custom 404
app.use((req, res, next) => {
    res.status(404).json({ message: "Sorry can't find that!" });
});

// custom error handler
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!" });
});

export default app;
