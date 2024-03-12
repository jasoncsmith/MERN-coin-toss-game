import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

dotenv.config()

import authRoutes from './routes/authRoute.js'
import gameRoutes from './routes/gameRoute.js'

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json({ limit: '5mb', extended: true }))
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(cors())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/game', gameRoutes)

export default app
