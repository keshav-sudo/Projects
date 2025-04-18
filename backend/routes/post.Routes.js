import express from "express";
import { protect } from "../middleware/protect.js";
import { createPost, deletePost, getallpost} from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.js";

const postRouter = express.Router();

postRouter.post("/create", protect, upload.single("Img"), createPost);
postRouter.get("/getall" ,  getallpost);
postRouter.delete("/:id" ,protect, deletePost )
export default postRouter;