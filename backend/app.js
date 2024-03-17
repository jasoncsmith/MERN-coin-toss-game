import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

import AppError from './utils/appError.js'
import globalErrorHandler from './controllers/errorController.js'

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

app.all('*', (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404))
})

app.use(globalErrorHandler)

export default app
