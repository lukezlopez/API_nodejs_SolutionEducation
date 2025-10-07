import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

if (process.env.NODE_ENV !== "test") {
    mongoose.connect(process.env.MONGO_URI!)
        .then(() => {
            console.log("MongoDB conectado");

            const port = process.env.PORT || 3000;
            app.listen(port, () => {
                console.log(`Servidor rodando na porta ${port}`);
            });
        })
        .catch((err) => {
            console.error("Erro ao conectar no MongoDB:", err);
        });
}

export default app;
