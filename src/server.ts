// import "dotenv/config";
import app from "./app";
import { prisma } from "./lib/prisma";
import config from "./config";

const PORT = config.port;

async function main() {
    try {
        await prisma.$connect();
        console.log(`Connected to the database successfully..!`)
        app.listen(PORT, () => {
            console.log(`Prisma Press Backend Server listening on port ${PORT}..!`)
        })
    } catch (error) {
        await prisma.$disconnect();
        console.error("Error starting the server:", error);
        process.exit(1)
    }
}

main();