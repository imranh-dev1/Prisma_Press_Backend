import { prisma } from "../../lib/prisma";
import { ICreateComment } from "./comment.interface";

const createCommentToDB = async (payload: ICreateComment, authorId: string) => {
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    })

    const comment = await prisma.comment.create({
        data: {
            ...payload,
            authorId: authorId
        }
    })

    return comment
};

const getCommentByIdToDB = async (commentId: string) => {
    const comment = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
        },
        include: {
            post: true,
        },

    });

    return comment

}

const getCommentByAuthorIdToDB = async (authorId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            authorId: authorId
        },
        orderBy: { createdAt: "desc" },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })
    return comments
}


export const commentService = {
    createCommentToDB,
    getCommentByIdToDB,
    getCommentByAuthorIdToDB
} 