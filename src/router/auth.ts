import express from "express";
import { User } from "../entity/user";
import repository from "../repository/user";
import { generateAccessToken, hashPassword, isValidPassword } from "../utils";

const router = express.Router();

router.post("/register", async (req, res, next) => {
    const { email, password } = req.body;

    let newUser = new User();
    newUser.email = email;
    newUser.username = email.slice(0, email.indexOf("@"));
    newUser.roles = ["ROLE_USER"];
    newUser.password = await hashPassword(password);

    newUser = await repository.save(newUser);

    return res.status(201).json({ message: "user created", user: newUser });
});

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    const user = await repository.findOneBy({ email });

    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    if (!isValidPassword(password, user.password)) {
        return res.status(401).json({ message: "invalid credential" });
    }

    const accessToken = generateAccessToken({
        _id: user.id,
        email: user.email,
    });

    return res
        .cookie("token", accessToken, { httpOnly: true })
        .status(200)
        .json({ access_token: accessToken });
});
