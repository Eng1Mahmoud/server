
import express from "express";
import { createPost, getPosts, updatePost, deletePost, likeCount } from "../controllers/posts.js";
const router = express.Router();
import auth from "../middleware/auth.js"

// link is started from index.js  => localhost:5000/posts/:id
router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likeCount", auth, likeCount);

export default router;

