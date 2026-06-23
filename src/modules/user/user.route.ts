import { Router } from "express";
import { userControler } from "./user.controller";

const router = Router();

router.post("/register", userControler.registeredUser)

export const userRoute = router;