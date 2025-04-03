import mongoose from "mongoose";
import express from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";

const authrouter = express.Router();

authrouter.get("/signup" , signup );

authrouter.get("/signin" , signin );

authrouter.get("/logout" ,signout);

export default authrouter;