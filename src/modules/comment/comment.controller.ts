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

const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const id = req.params.commentId;
    const authorId = req.user?.id;

    const result = await commentService.updateCommentToDB(payload, id as string, authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Comment Updated successfully...!",
        data: result
    })
});

const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.commentId;
    const authorId = req.user?.id;
    const result = await commentService.deleteCommentFormDB(id as string, authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Comment Deleted successfully...!",
        data: result
    });
});

const moderateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const id = req.params.commentId;

    const result = await commentService.moderateCommentFormDB(payload, id as string);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Modarate Comment Updated successfully...!",
        data: result
    })
});


export const commentController = {
    createComment,
    getCommentById,
    getCommentByAuthorId,
    updateComment,
    deleteComment,
    moderateComment
}