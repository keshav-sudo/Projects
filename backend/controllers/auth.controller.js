import User from "../models/user.model.js";
import z from "zod";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from  "jsonwebtoken";
import { generateTokenAndSetCookie } from "../lib/utlis/generatetoken.js";

export const signup = async(req , res)=>{
      
    const signupSchema = z.object({
        username: z.string().min(3),
        fullname: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6)
        
    })

    try {

        const result = signupSchema.safeParse(req.body);
        if(!result.success){
            res.status(422).send("zod validation is failed");
        }

        const { fullname , username , email , password } = req.body;

        const existinguser = await User.findOne({username});
        if(existinguser){
            res.status(400).json({
                error : "user alreday exist"
            })
        }
        const existingemail = await User.findOne({email});
        if(existingemail){
            res.status(400).json({
                error : "email alreday exist"
            })
        }
        
        if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new User ({
            username,
            fullname,
            email,
            password: hashedpassword,
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id , res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
				username: newUser.username,
				email: newUser.email,
				followers: newUser.followers,
				following: newUser.following,
				profileImg: newUser.profileImg,
				coverImg: newUser.coverImg,
                
            });
        }else{
            res.status(400).json({ error : "Invalid user data"})
        }


    } catch (error) {
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
};

export const signin = async (req , res)=>{
   try {

    const loginSchema = z.object({
        username : z.string().min(3),
        password : z.string().min(6)
    })

    const result = loginSchema.safeParse(req.body);
    if(!result.success){
        return res.status(422).json({messgae : "zod validation failed"})
    }
    const {username , password} = req.body;
    const user = await User. findOne({username});
    const isPasswordcorrect = await bcrypt.compare(password, user?.password || "");

    
    if(!user || !isPasswordcorrect){
        return res.status(400).json({error: "Invailid username or password"})
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
			_id: user._id,
			fullname: user.fullname,
			username: user.username,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
    });

   } catch (error) {
        console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
   }
}

export const signout =  (req, res)=>{
  try {
    res.cookie("jwt", "", {maxAge : 0});
    res.status(200).json({message  : "Logged out succesfully"});
  } catch (error) {
    console.log("Error in logout controller", error.message );
    res.status(500).json({error : "Internal server error"})
  }
};


export const getme = async (req , res)=> {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}