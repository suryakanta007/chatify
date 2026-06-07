import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("combined"));

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

// Routes
app.use("/api/v1/auth",authRoutes);

export default app;
