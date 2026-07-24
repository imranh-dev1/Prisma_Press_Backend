import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { subscriptionServices } from "./subscription.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";

const createCheckoutSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const result = await subscriptionServices.createCheckoutSession(userId as string);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Checkout session created successfully....",
        data: result
    })
})

const handleWebhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const event = req.body as Buffer;
        const signature = req.headers['stripe-signature']!;

        await subscriptionServices.handleWebhook(event, signature as string)

        sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Webhook triggered successfully",
            data: null
        })
    }
)

const getSubscriptionStatus = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id

        const result = await subscriptionServices.getSubscriptionStatus(userId as string);

        sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Subscription status retrived successfully",
            data: result
        })
    }
)


export const subscriptionControllers = {
    createCheckoutSession,
    handleWebhook,
    getSubscriptionStatus
}