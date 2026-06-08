import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import ENV from "./config/config.js";

const app = express();
app.use(express.json());
app.use(morgan(ENV.NODE_ENV === "development" ? "dev" : "combined"));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

// Routes
app.use("/api/v1/auth",authRoutes);


app.use(errorMiddleware);

export default app;
