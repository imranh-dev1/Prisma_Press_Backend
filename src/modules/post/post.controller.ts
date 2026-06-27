import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user?.id;

    const postResult = await postService.createPostWithDB(payload, userId as string);

    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "Post created successfully...!",
        data: postResult
    })

});

const getAllPost = () => {

};


export const postController = {
    createPost,
    getAllPost
};