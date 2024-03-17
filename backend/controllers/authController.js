import jwt from 'jsonwebtoken'
import catchAsyncError from '../utils/catchAsyncError.js'
import AppError from '../utils/appError.js'
import { createGame } from './gameController.js'
import { createUser, getUser } from './userController.js'

const createSignedToken = ({ _id, name, email }) => {
  return jwt.sign(
    {
      _id,
      name,
      email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  )
}

export const signup = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body

  const existingUser = await getUser(email)
  if (existingUser) {
    return next(new AppError('User already has an account', 400))
  }

  if (password !== confirmPassword) {
    return next(new AppError('Passwords do not match', 400))
  }

  const newUser = await createUser(req.body)
  await createGame(newUser._id)

  res.status(200).json({ token: createSignedToken(newUser) })
})

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body
  const existingUser = await await getUser(email)

  if (!existingUser) {
    return next(new AppError('User not found', 404))
  }

  const isPasswordCorrect = await existingUser.arePasswordsTheSame(password, existingUser.password)

  if (!isPasswordCorrect) {
    return next(new AppError('Invalid Password', 401))
  }

  res.status(200).json({ token: createSignedToken(existingUser) })
})
