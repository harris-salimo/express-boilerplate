import dotenv from "dotenv";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import repository from "../repository/user";

dotenv.config();

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_PASSPHRASE,
    issuer: "my.example.com",
    audience: "me.com",
};

type PayloadType = {
    sub: string;
    _id: any;
    email: string;
    iat: number;
};
const verify = async (payload: PayloadType, done: any) => {
    const user = await repository.findOneBy({ id: +payload.sub });

    if (!user) {
        return done(null, false);
    }
    return done(null, user);
};

passport.use(new Strategy(opts, verify));

export { passport };

