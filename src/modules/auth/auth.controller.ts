import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refressToken } = await authService.loginUserWithDB(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    })

    res.cookie("refressToken", refressToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })


    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "User logined successfully..!",
        data: { accessToken, refressToken }
    })

})


const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { refressToken } = req.cookies;

    const { accessToken } = await authService.refreshToken(refressToken)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Refresh Token Genareted",
        data: {
            accessToken
        }
    })

})


export const authController = {
    loginUser,
    refreshToken
} 