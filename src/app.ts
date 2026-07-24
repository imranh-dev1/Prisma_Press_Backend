import express, { Application, Request, Response } from "express";
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
import { premiumRoutes } from "./modules/premium/premium.route";

const app: Application = express()

app.use(cors({
    origin: config.app_url,
    credentials: true
}));


app.use("/api/subscription/webhook", express.raw({ type: 'application/json' }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use("/api/premium", premiumRoutes)

app.use(notFound)
app.use(globalErrorHandler)


export default app;



