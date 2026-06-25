import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn
    } as SignOptions)
}

const verifyTokens = (token: string, secret: string) => {
    const verifyToken = jwt.verify(token, secret);
    return verifyToken;
}

export const jwtTokens = {
    createToken,
    verifyTokens
}