import { Router } from "express";
import { subscriptionControllers } from "./subscription.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/checkout", auth(Role.ADMIN, Role.AUTHOR, Role.USER), subscriptionControllers.createCheckoutSession);

router.post("/webhook", subscriptionControllers.handleWebhook)

router.get("/status", auth(Role.USER, Role.AUTHOR, Role.ADMIN), subscriptionControllers.getSubscriptionStatus)

export const subscriptionRoutes = router;