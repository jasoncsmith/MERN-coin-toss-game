import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace(/^Bearer\s/, '')
    const decodedToken = token && jwt.verify(token, process.env.SECRET_KEY)

    if (decodedToken) {
      req.userId = decodedToken._id
      next()
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(500).end('Could not verify token')
  }
}

export default verifyToken
