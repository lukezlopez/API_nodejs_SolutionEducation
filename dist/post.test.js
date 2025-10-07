"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
jest.setTimeout(15000);
beforeAll(async () => {
    await mongoose_1.default.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/blog-test');
});
afterAll(async () => {
    await mongoose_1.default.connection.close();
});
describe('POST /api/posts', () => {
    it('Deve criar uma postagem com dados válidos', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/posts')
            .send({ title: 'Teste Jest', content: 'Conteúdo do teste'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe('Teste Jest');
    });
    it('Deve retornar erro se título estiver faltando', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/posts')
            .send({ content: 'Sem título'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('errors');
    });
});
