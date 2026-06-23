import exprese, { Application, Request, Response } from "express";

const app: Application = exprese()

app.get('/', (req: Request, res: Response) => {
    res.send('Prisma Press Backend App Running....')
})

export default app;



