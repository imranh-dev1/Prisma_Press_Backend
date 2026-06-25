import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AuthInterface } from "./auth.interface"
import { jwtTokens } from "../../utils/jwt";
import config from "../../config";
import { SignOptions } from "jsonwebtoken";

const loginUserWithDB = async (payload: AuthInterface) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })

    const matchedPassword = bcrypt.compareSync(password, user.password)

    if (!matchedPassword) {
        throw new Error("Password incorrect...!")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role

    }

    const accessToken = jwtTokens.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    );

    const refressToken = jwtTokens.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions
    );

    return {
        accessToken,
        refressToken
    };
}

export const authService = {
    loginUserWithDB
}