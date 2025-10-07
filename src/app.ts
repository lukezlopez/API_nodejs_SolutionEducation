import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.routes";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

// ✅ Suas rotas da API
app.use("/api", postRoutes);

export default app;
