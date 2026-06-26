import { Router } from "express";
import { userControler } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", userControler.registeredUser);
router.get("/me", auth(Role.ADMIN, Role.USER, Role.AUTHOR), userControler.meUserProfile);

export const userRoute = router;