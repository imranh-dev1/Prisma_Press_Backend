import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AuthInterface } from "./auth.interface"

const loginUserWithDB = async (payload: AuthInterface) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })

    const matchedPassword = bcrypt.compareSync(password, user.password)

    if (!matchedPassword) {
        throw new Error("Password incorrect...!")
    }

    return user;
}

export const authService = {
    loginUserWithDB
}