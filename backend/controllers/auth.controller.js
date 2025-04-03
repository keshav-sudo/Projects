import User from "../models/user.model.js";
import z from "zod";
import mongoose from "mongoose";
import jwt from  "jsonwebtoken";

export const signup = async(req , res)=>{
      
    const signupSchema = z.object({
        username: z.string().min(3),
        fullname: z.string().min(3),
        password: z.string().min(6),
        email: z.string().email()
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


    } catch (error) {
        res.status(500).json({
            message : `there is some error ${error}` 
        })
    }
}

export const signin = (req , res)=>{
    res.json({
        data : "you hit the signin endpoint"
    })
}

export const signout =  (req, res)=>{
    res.send("you hit logout end point")
};