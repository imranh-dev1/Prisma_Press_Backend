import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { commentController } from "./comment.controller";

const router = Router();

router.post("/", auth(Role.USER, Role.AUTHOR, Role.ADMIN), commentController.createComment);
router.get("/:commentId", commentController.getCommentById);

export const commentRouter = router;