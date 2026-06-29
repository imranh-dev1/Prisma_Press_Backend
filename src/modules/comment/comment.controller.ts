import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const authorId = req.user?.id;

    const result = await commentService.createCommentToDB(payload, authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "Comment created successfully",
        data: result
    })
});

const getCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.commentId;

    const result = await commentService.getCommentByIdToDB(id as string);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Comment get successfully...!",
        data: result
    })
});


const getCommentByAuthorId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;

    const result = await commentService.getCommentByAuthorIdToDB(authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Get all comments by Author ID successfully...!",
        data: result
    })
});

export const commentController = {
    createComment,
    getCommentById,
    getCommentByAuthorId
}