import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB not connected", error);
        process.exit(1);
    }
};

export default connectDB;