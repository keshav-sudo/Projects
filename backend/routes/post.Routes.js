import express from "express";
import { protect } from "../middleware/protect.js";
import { commentOnPost, createPost, deletePost, getallpost, getfollowingpost, getlikedpost, getuserpost, likeunlikepost } from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.js";

const postRouter = express.Router();

postRouter.post("/create", protect, upload.single("Img"), createPost);
postRouter.get("/getall" ,  getallpost);
postRouter.delete("/:id" ,protect, deletePost )
postRouter.get("/comment" , commentOnPost  )
postRouter.get("/likeunlike" , likeunlikepost  )
postRouter.get("/getliked" , getlikedpost  )
postRouter.get("/following" , getfollowingpost )
postRouter.get("/user" ,  getuserpost)

export default postRouter;