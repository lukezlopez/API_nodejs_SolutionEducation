import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/post.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/api", postRoutes);

export default app;
