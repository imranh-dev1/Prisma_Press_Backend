import { Router } from "express";
import { subscriptionControllers } from "./subscription.controller";

const router = Router();

router.post("/checkout", subscriptionControllers.createCheckoutSession)

export const subscriptionRoutes = router;