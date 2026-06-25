import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import status from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken";
import config from "../../config";
import { jwtTokens } from "../../utils/jwt";

// const registeredUser = async (req: Request, res: Response) => {


//     try {
//         const payload = req.body;

//         const user = await userService.registeredUserWithDB(payload);

//         res.send({
//             success: true,
//             statusCode: status.CREATED,
//             meassage: "User registered successfully",
//             data: {
//                 user
//             }
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(status.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             statusCode: status.INTERNAL_SERVER_ERROR,
//             message: "Feield to register user",
//             error: (error as Error).message
//         })
//     }
// }

const registeredUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registeredUserWithDB(payload);

    // res.send({
    //     success: true,
    //     statusCode: status.CREATED,
    //     meassage: "User registered successfully",
    //     data: {
    //         user
    //     }
    // })

    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "User registered successfully..!",
        data: { user }
    })

})

const meUserProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refressToken } = req.cookies;

    const verifiedToken = jwtTokens.verifyTokens(accessToken, config.jwt_access_secret);

    if (typeof (verifiedToken) === "string") {
        throw new Error(verifiedToken)
    }

    const meProfile = await userService.meUsreProfileWithDB(verifiedToken.id)

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Me user fetched in successfully...",
        data: meProfile
    })
})

export const userControler = {
    registeredUser,
    meUserProfile
}