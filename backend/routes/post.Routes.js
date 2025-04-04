import express from "express";
import { protect } from "../middleware/protect.js";
import { commentOnPost, createPost, deletePost, getfollowingpost, getlikedpost, getuserpost, likeunlikepost } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.get("/create" , createPost )
postRouter.get("/delete" , deletePost )
postRouter.get("/comment" , commentOnPost  )
postRouter.get("/likeunlike" , likeunlikepost  )
postRouter.get("/getliked" , getlikedpost  )
postRouter.get("/following" , getfollowingpost )
postRouter.get("/user" ,  getuserpost)

export default postRouter;