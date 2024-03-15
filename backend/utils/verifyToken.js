import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace(/^Bearer\s/, '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if (!decoded) {
      return res.status(401).json({ message: 'Please log in' })
    }

    const { _id } = decoded
    const user = await User.findOne({ _id })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.userId = _id
    next()
  } catch (error) {
    // res.status(500).json(error)
    res.status(500).end('Something went wrong')
  }
}

export default verifyToken
