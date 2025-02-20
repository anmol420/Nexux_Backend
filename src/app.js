import express from "express";

const app = express();

app.use(express.json({
    limit: "30mb",
}));

app.use(express.urlencoded({
    extended: true,
    limit: "30mb",
}));

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