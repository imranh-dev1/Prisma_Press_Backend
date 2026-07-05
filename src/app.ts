import exprese, { Application, Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config";
import { userRoute } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { postRouter } from "./modules/post/post.route";
import { commentRouter } from "./modules/comment/comment.router";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { subscriptionRoutes } from "./modules/subscription/subscription.route";
import { stripe } from "./lib/stripe";

const app: Application = exprese()

app.use(cors({
    origin: config.app_url,
    credentials: true
}));

const endpointSecret = config.stripe_webhook_secret;

app.post("/api/subscriprion/webhook", exprese.raw({ type: 'application/json' }), (request, response) => {
    let event = request.body;
    console.log(event, "stripe request body");
    console.log(request.headers, "stripe req headers");
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature']!;
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err: any) {
            console.log(`⚠️ Webhook signature verification failed.`, err.message);
            return response.status(400).json({
                message: err.message
            });
        }
    }
    console.log(event, "event after try block");

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
})

app.use(exprese.json());
app.use(exprese.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', async (req: Request, res: Response) => {
    res.send('Prisma Press Backend App Running....')
})

// app.post('/api/users')
app.use("/api/users", userRoute)

app.use("/api/auth", authRouter)

app.use("/api/posts", postRouter)

app.use("/api/comments", commentRouter)

app.use("/api/subscription", subscriptionRoutes)

app.use(notFound)
app.use(globalErrorHandler)


export default app;



