import express from 'express'
import postRoutes from './routes/post.routes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/api', postRoutes)

export default app