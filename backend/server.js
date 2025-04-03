import express from "express";
import authRouter from "./routes/auth.Routes.js";
import dotenv from "dotenv";
import { connectdb } from "./db/connectmongo.js";

dotenv.config();  

const PORT = process.env.PORT 
const MONGO_URI = process.env.MONGO_URI;

console.log("PORT:", PORT); // Debugging
console.log("MONGO_URI:", MONGO_URI); // Debugging

const app = express();

app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.listen(PORT, () => {
    connectdb();
    console.log(`Your server is up on port ${PORT}`);
}); 