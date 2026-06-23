import exprese, { Application, Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config";
import status from "http-status";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { userRoute } from "./modules/user/user.route";

const app: Application = exprese()

app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.use(exprese.json());
app.use(exprese.urlencoded({ extended: true }))
app.use(cookieParser())


app.get('/', async (req: Request, res: Response) => {
    res.send('Prisma Press Backend App Running....')
})

// app.post('/api/users')
app.use("/api/users", userRoute)



export default app;



