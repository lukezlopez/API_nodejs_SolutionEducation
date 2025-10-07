"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const zod_1 = require("zod");
exports.postSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'O título é obrigatório'),
    content: zod_1.z.string().optional(),
});
