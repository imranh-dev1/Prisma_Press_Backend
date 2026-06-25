import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const loginedUser = await authService.loginUserWithDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "User logined successfully..!",
        data: loginedUser
    })

})

export const authController = {
    loginUser
} 