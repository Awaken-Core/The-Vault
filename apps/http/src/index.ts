import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server_env as env } from "@repo/env";
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";

const app = express();

const allowedOrigins = ["http://localhost:3000",].filter(
    (origin): origin is string => Boolean(origin),
);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }
            callback(new Error(`CORS blocked for origin: ${origin}`));
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    }),
);

app.use(cookieParser());
app.use(express.json());

app.get('/health', (req, res) => {
    res.send("All Good!")
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});