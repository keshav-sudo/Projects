import express from "express";
import { getme, signin, signout, signup } from "../controllers/auth.controller.js";
import { protect } from "../middleware/protect.js";

const authrouter = express.Router();

authrouter.post("/signup" , signup );

authrouter.post("/signin" , signin );

authrouter.get("/logout" ,signout);

authrouter.get("/getme" ,protect, getme ); 

export default authrouter;  