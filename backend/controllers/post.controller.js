
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







export const deletePost = async (req , res) =>{
    res.send("hit delete post route")
}





export const commentOnPost = async (req , res)=>{
    res.send("hit comment route")
}






export const likeunlikepost = async (req , res)=>{
    res.send("hit comment route")
}







export const getallpost = async (req , res)=>{
    res.send("hit comment route")
}


export const getlikedpost = async (req , res)=>{
    res.send("hit comment route")
}


export const getfollowingpost = async (req , res)=>{
    res.send("hit comment route")
}

export const getuserpost= async (req , res)=>{
    res.send("hit comment route")
}