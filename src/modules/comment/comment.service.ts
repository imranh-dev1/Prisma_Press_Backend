import { prisma } from "../../lib/prisma";
import { ICreateComment, IModerateComment, IUpdateComment } from "./comment.interface";

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

};

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
};

const updateCommentToDB = async (payload: IUpdateComment, commentId: string, authorId: string) => {

    await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
            authorId: authorId
        },
        select: {
            id: true
        }
    });

    const updateComment = await prisma.comment.update({
        where: {
            id: commentId,
            authorId: authorId
        },
        data: {
            ...payload
        }
    });

    return updateComment;

};

const deleteCommentFormDB = async (commentId: string, authorId: string) => {
    await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
            authorId: authorId
        },
        // select: {
        //     id: true
        // }
    });

    await prisma.comment.delete({
        where: {
            id: commentId,
            authorId: authorId
        }
    });

    return null;
};

const moderateCommentFormDB = async (payload: IModerateComment, commentId: string) => {

    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId
        },
        select: {
            id: true,
            status: true
        }
    });

    if (commentData.status === payload.status) {
        throw new Error(`Your provided status (${payload.status}) is already up to date.`)
    }

    const comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: payload
    });

    return comment;

};



export const commentService = {
    createCommentToDB,
    getCommentByIdToDB,
    getCommentByAuthorIdToDB,
    updateCommentToDB,
    deleteCommentFormDB,
    moderateCommentFormDB
} 