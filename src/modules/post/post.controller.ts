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

const getAllPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allposts = await postService.getAllPostToDB();

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "All posts get successfully...!",
        data: allposts
    })
});


const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    if (!postId) {
        throw new Error("Post id requred in this api")
    }
    const post = await postService.getPostByIdToDB(postId as string)

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "All posts get successfully...!",
        data: post
    })
});

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const posts = await postService.getMyPostsToDB(authorId as string)

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Get all my posts successfully...!",
        data: posts
    })
});

const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const postId = req.params.postId;
    const payload = req.body;

    if (!postId) {
        throw new Error("Post id requred in this api...!")
    };

    const result = await postService.updatePostToDB(postId as string, authorId as string, isAdmin, payload);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Updated post successfully...!",
        data: result
    })
});


const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const postId = req.params.postId;

    if (!postId) {
        throw new Error("Post id requred in this api...!")
    };

    await postService.deletePostToDB(postId as string, authorId as string, isAdmin);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Post deleted successfully...!",
        data: null
    })
})

export const postController = {
    createPost,
    getAllPost,
    getPostById,
    getMyPosts,
    updatePost,
    deletePost
};