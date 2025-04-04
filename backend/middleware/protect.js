import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protect = async (req , res, next)=>{
    try {
         const token = req.cookies.jwt;
    if(!token){
       return res.status(401).json({error : "inavlid request while token generating"})
    }

    const decode = jwt.verify(token , process.env.JWT_SECRET);
    if(!decode){
       return res.status(401).json({error : "error while jwt verification"})
    }
    
    const userID = decode.userId;
    const user = await User.findById(userID).select("-password");
    if(!user){
        return res.status(401).json({error : "error  while user finding"})
    }
    req.user = user;
    next();

    } catch (error) {
        console.log("error and hit the catch block" , error.message);
        return  res.status(500).json({error : "error while protect block"})
    }
   
}