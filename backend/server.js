import express from "express";
import authRouter from "./routes/auth.Routes.js";
import dotenv from "dotenv";
import { connectdb } from "./db/connectmongo.js";
import cookieParser from "cookie-parser"
import postRouter from "./routes/post.Routes.js";
const app = express();
app.use(cookieParser());

dotenv.config();  

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


const PORT = process.env.PORT 
const MONGO_URI = process.env.MONGO_URI


console.log("PORT:", PORT); // Debugging
console.log("MONGO_URI:", MONGO_URI); // Debugging



app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.listen(PORT, () => {
    connectdb();
    console.log(`Your server is up on port ${PORT}`);
}); 