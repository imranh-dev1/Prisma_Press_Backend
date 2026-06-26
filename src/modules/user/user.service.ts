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

const meUsreProfileWithDB = async (userId: string) => {
    const meProfile = await prisma.user.findFirstOrThrow({
        where: {
            id: userId
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })

    return meProfile
}

const updatedUserWithDB = async (userId: string, payload: any) => {
    const { name, email, profilePhoto, bio } = payload;

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            name,
            email,
            profile: {
                update: {
                    profilePhoto,
                    bio
                }
            }
        },
        omit: {
            password: true,
        },
        include: {
            profile: true,
        }
    })
    return updatedUser;
}

export const userService = {
    registeredUserWithDB,
    meUsreProfileWithDB,
    updatedUserWithDB
}