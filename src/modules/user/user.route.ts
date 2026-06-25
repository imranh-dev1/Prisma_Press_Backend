import { Router } from "express";
import { userControler } from "./user.controller";

const router = Router();

router.post("/register", userControler.registeredUser)
router.get("/me", userControler.meUserProfile)

export const userRoute = router;