import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

type PayloadType = {
    _id: number;
    email: string;
};

const generateAccessToken = (payload: PayloadType) => {
    return jwt.sign(payload, process.env.JWT_PASSPHRASE || "secret", {
        expiresIn: "1800s",
    });
};

const hashPassword = async (plainPassword: string) => {
    return await bcrypt.hash(plainPassword, 10);
};

const isValidPassword = async (
    plainPassword: string,
    hashedPassword: string
) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export { generateAccessToken, hashPassword, isValidPassword };

