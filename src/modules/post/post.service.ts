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
};

const getPostByIdToDB = async (postId: string) => {
    await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    });

    const updatePostView = prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            views: {
                increment: 1
            }
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    })

    return updatePostView;
};



export const postService = {
    createPostWithDB,
    getAllPostToDB,
    getPostByIdToDB
}