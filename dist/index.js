"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', post_routes_1.default);
if (process.env.NODE_ENV !== 'test') {
    mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
        console.log('MongoDB conectado');
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    });
}
exports.default = app;
