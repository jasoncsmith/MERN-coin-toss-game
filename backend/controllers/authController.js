import jwt from 'jsonwebtoken'
import { createGame } from './gameController.js'
import { createUser, getUser } from './userController.js'

const createSignedToken = ({ _id, name, email, password }) => {
  return jwt.sign(
    {
      _id,
      name,
      email,
      password,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  )
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body

  try {
    const existingUser = await getUser(email)
    if (existingUser) {
      return res.status(400).json({ message: 'User Already Exist' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password Does Not Match' })
    }

    const newUser = await createUser(req.body)
    await createGame(newUser._id)

    res.status(200).json({ token: createSignedToken(newUser) })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await await getUser(email)

    if (!existingUser) {
      return res.status(404).json({ message: 'User Does Not Exist' })
    }

    const isPasswordCorrect = await existingUser.arePasswordsTheSame(password, existingUser.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Password' })
    }

    res.status(200).json({ token: createSignedToken(existingUser) })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}
