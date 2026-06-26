import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn
    } as SignOptions)
}

const verifyTokens = (token: string, secret: string) => {
    try {
        const verifyToken = jwt.verify(token, secret);
        return {
            success: true,
            data: verifyToken
        }
    } catch (error: any) {
        console.log("Token verification faild:", error)
        return {
            success: false,
            error: error.message
        }
    }
}

export const jwtTokens = {
    createToken,
    verifyTokens
}