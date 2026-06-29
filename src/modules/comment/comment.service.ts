import { prisma } from "../../lib/prisma";
import { ICreateComment } from "./comment.interface";

const createComment = async (payload: ICreateComment, authorId: string) => {
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


export const commentService = {
    createComment
} 