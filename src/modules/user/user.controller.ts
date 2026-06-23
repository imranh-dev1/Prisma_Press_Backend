import { Request, Response } from "express";
import { userService } from "./user.service";
import status from "http-status";

const registeredUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const user = await userService.registeredUserWithDB(payload);

        res.send({
            success: true,
            statusCode: status.CREATED,
            meassage: "User registered successfully",
            data: {
                user
            }
        })
    } catch (error) {
        console.log(error)
        res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: status.INTERNAL_SERVER_ERROR,
            message: "Feield to register user",
            error: (error as Error).message
        })
    }
}

export const userControler = {
    registeredUser,
}