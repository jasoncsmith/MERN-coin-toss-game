import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Please provide your name'] },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    validate: {
      validator: val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val),
      message: () => 'Please provide a valid email',
    },
  },
  password: { type: String, required: [true, 'Please provide a password'] },
  id: { type: String },
})

userSchema.methods.arePasswordsTheSame = async function (pw1, pw2) {
  return await bcrypt.compare(pw1, pw2)
}

export default mongoose.model('User', userSchema)
