import bcrypt from 'bcryptjs'
import User from '../models/user.js'

const getUsers = async () => {
  try {
    return await User.find()
  } catch (error) {
    return error
  }
}

export const getUser = async email => {
  try {
    return await User.findOne({ email })
  } catch (error) {
    return error
  }
}

export const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    return await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    })
  } catch (error) {
    return error
  }
}
