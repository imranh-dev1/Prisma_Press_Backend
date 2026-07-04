import { Router } from "express";
import { subscriptionControllers } from "./subscription.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/checkout", auth(Role.ADMIN, Role.AUTHOR, Role.USER), subscriptionControllers.createCheckoutSession)

export const subscriptionRoutes = router;