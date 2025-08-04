import request from 'supertest'
import mongoose from 'mongoose'
import app from './app'

jest.setTimeout(15000)

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/blog-test')
});

afterAll(async () => {
    await mongoose.connection.close()
})

describe('POST /api/posts', () => {
    it('Deve criar uma postagem com dados válidos', async () => {
        const res = await request(app)
            .post('/api/posts')
            .send({ title: 'Teste Jest', content: 'Conteúdo do teste' 
        })
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('_id')
        expect(res.body.title).toBe('Teste Jest')
    })

    it('Deve retornar erro se título estiver faltando', async () => {
        const res = await request(app)
            .post('/api/posts')
            .send({ content: 'Sem título' 
            });
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('errors')
    })
})
