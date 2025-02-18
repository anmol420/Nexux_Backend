import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import candidateAuthRoutes from "./routes/candidateAuthRoutes.js";
import employerAuthRoutes from "./routes/employerAuthRoutes.js"; 
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/candidate", candidateAuthRoutes);
app.use("/api/employer", employerAuthRoutes);

export default app;
