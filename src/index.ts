import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postRoutes from './routes/post.routes'

dotenv.config()

const app = express()
app.use(express.json())
app.use('/api', postRoutes)

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGO_URI!).then(() => {
        console.log('MongoDB conectado')
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`)
        })
    })
}

export default app