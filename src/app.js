// import express from "express";

// const app = express();

// app.use(express.json({
//     limit: "30mb",
// }));

// app.use(express.urlencoded({
//     extended: true,
//     limit: "30mb",
// }));

// app.get("/", (req, res) => {
//     res.send("API is running...");
// });

// import candidateRoutes from "./routes/candidate.routes.js";
// import employerRoutes from "./routes/employer.routes.js";
// import generalRoutes from "./routes/general.routes.js";

// app.use("/api/candidate", candidateRoutes);
// app.use("/api/employer", employerRoutes);
// app.use("/api", generalRoutes);

// export default app;


import express from "express";
import cors from "cors";  // Import CORS

const app = express();

// Enable CORS for all origins (for mobile apps)
app.use(cors());

// If you want stricter security, allow only your EC2 public IP
// Replace `your-ec2-ip` with your actual EC2 public IPv4
app.use(cors({
    origin: "*",  // Allows requests from any origin (good for mobile)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.get("/", (req, res) => {
    res.send("API is running...");
});

import candidateRoutes from "./routes/candidate.routes.js";
import employerRoutes from "./routes/employer.routes.js";
import generalRoutes from "./routes/general.routes.js";

app.use("/api/candidate", candidateRoutes);
app.use("/api/employer", employerRoutes);
app.use("/api", generalRoutes);

export default app;
