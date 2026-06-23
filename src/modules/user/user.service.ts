import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { RegisteredUser } from "./user.interface";

const registeredUserWithDB = async (payload: RegisteredUser) => {
    const { name, email, password, profilePhoto } = payload;

    const userAlreadyExist = await prisma.user.findUnique({
        where: { email }
    });

    if (userAlreadyExist) {
        throw new Error("User user Already Exist...!")
    }

    const bcryptPassword = bcrypt.hashSync(password, Number(config.bcrypt_salt_rounds))

    const userCreated = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: bcryptPassword
        }
    })

    await prisma.profile.create({
        data: {
            userId: userCreated.id,
            profilePhoto: profilePhoto,
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: userCreated.id,
            email: userCreated.email
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })

    return user;
}

export const userService = {
    registeredUserWithDB,
}