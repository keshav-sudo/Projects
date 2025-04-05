import path from "path";
import express from "express";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from "cloudinary";


import postRouter from "./routes/post.Routes.js";
import authRouter from "./routes/auth.Routes.js";



import { connectdb } from "./db/connectmongo.js";
dotenv.config();  
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

const __dirname = path.resolve();
const PORT = process.env.PORT 
const MONGO_URI = process.env.MONGO_URI


console.log("PORT:", PORT); // Debugging
console.log("MONGO_URI:", MONGO_URI); // Debugging



app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);





app.listen(PORT, () => {
    connectdb();
    console.log(`Your server is up on port ${PORT}`);
}); 