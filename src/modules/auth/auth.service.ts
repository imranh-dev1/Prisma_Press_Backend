import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AuthInterface } from "./auth.interface"
import { jwtTokens } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload, SignOptions } from "jsonwebtoken";

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

const refreshToken = async (refreshToken: string) => {

    const verifiedRefreshToken = jwtTokens.verifyTokens(refreshToken, config.jwt_refresh_secret);

    if (!verifiedRefreshToken.success) {
        throw new Error(verifiedRefreshToken.error)
    };

    const { id } = verifiedRefreshToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });

    if (user.activeStatus === "BLOCKED") {
        throw new Error("User is Blocked");
    }

    const jwtPayload = {
        id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtTokens.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions)

    return { accessToken }
}


export const authService = {
    loginUserWithDB,
    refreshToken
}