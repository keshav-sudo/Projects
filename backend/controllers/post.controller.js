
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.model.js"; // adjust path
import User from "../models/user.model.js"; // adjust path


export const createPost = async (req, res) => {
  try {
    const {text} = req.body;
    let Img = null;
    if(!text){
        console.log("error in text req");
        return res.status(401).json({message : "invailid given text"});
        
    }

    const userId = req.user._id.toString();
    const find = await User.findById(userId);
    if(!find){
        console.log("error in while user find or db");
        return res.status(401).json({message : "error while user find"});
    }

    if(!text && !req.file){
        console.log("error in !text&&!error");
        return res.status(401).json({message : "error while req.file validation"})
    }

    if(req.file){
        const result = await new Promise ((resolve , reject) =>{
            const uploadstream = cloudinary.uploader.upload_stream(
                {resource_type: "image"},
                (error , result) =>{
                    if(error) return reject(error);
                    resolve(result);
                }
            )

            uploadstream.end(req.file.buffer);
        });
        Img = result.secure_url;

    }


    const newPost = new Post({
        user: userId,
        text,
        Img,
      });
      
      await newPost.save();
      

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("❌ Error in createPost:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getallpost = async (req , res)=>{
    try {
        const posts = await Post.find()
        .sort({createdAt : -1})
        .populate({
            path: "user",
            select: "-password"
        })
        .populate({
            path: "comments.user",
            select: "-password"
        });

        if(posts.length ==  0){
            res.status(200).json([]);
        }
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" })
    }
}


export const deletePost = async (req , res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(401).json({message : "post does'nt find"})
        }
        if(post.user.toString() !== req.user._id.toString()){
            res.status(401).json({msg : "you are not authorised to delete this post"})
        }
        if(post.Img){
            const Imgid = post.Img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(Imgid);
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log("Error in deletePost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
}





