import express from "express";
import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async(req , res)=>{
    res.send("on post create route")
}






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