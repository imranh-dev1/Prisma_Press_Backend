import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { postController } from "./post.controller";

const router = Router();

router.post("/", auth(Role.ADMIN, Role.USER, Role.AUTHOR), postController.createPost);
router.get("/", postController.getAllPost);

router.get("/my-posts", auth(Role.ADMIN, Role.USER, Role.AUTHOR), postController.getMyPosts);

router.get("/:postId", postController.getPostById);

router.patch("/:postId", auth(Role.ADMIN, Role.USER, Role.AUTHOR), postController.updatePost);

router.delete("/:postId", auth(Role.ADMIN, Role.USER, Role.AUTHOR), postController.deletePost);


export const postRouter = router;