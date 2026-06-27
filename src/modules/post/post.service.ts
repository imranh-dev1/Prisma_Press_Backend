import { prisma } from "../../lib/prisma";
import { ICreatePost } from "./post.interface";

const createPostWithDB = async (payload: ICreatePost, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    });
    return result
};

const getAllPostToDB = async () => {
    const result = await prisma.post.findMany({
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true,
        }
    });
    return result
}

export const postService = {
    createPostWithDB,
    getAllPostToDB
}