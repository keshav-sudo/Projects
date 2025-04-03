import mongoose from "mongoose";

export const connectdb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb is coneected succefully");
    } catch (error) {
        console.error(`there is some error while connecting mongodb ${error}`);
        process.exit(1);
    }
}
