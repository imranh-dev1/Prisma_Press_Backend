import exprese, { Application, Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config";
import { userRoute } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { postRouter } from "./modules/post/post.route";
import { commentRouter } from "./modules/comment/comment.router";
import { notFound } from "./middlewares/notFound";

const app: Application = exprese()

app.use(cors({
    origin: config.app_url,
    credentials: true
}))

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

app.use(notFound)


export default app;



