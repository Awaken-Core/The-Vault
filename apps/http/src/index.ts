import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";
import adminRoutes from "./routes/admin-routes";
import invitationsRoutes from "./routes/invitation-routes";
import quotationRoutes from "./routes/quotation-routes";
import productsRoutes from "./routes/product-routes";
import purchaseRoutes from "./routes/purchase-routes";
import serviceRoutes from "./routes/service-routes";
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
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/invitations", invitationsRoutes);
app.use("/api/v1/products", productsRoutes); 
app.use("/api/v1/quotations", quotationRoutes);
app.use("/api/v1/purchases", purchaseRoutes);
app.use("/api/v1/services", serviceRoutes);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

