import exprese, { Application, Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config";

const app: Application = exprese()

app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.use(exprese.json());
app.use(exprese.urlencoded({ extended: true }))
app.use(cookieParser())


app.get('/', (req: Request, res: Response) => {
    res.send('Prisma Press Backend App Running....')
})

export default app;



