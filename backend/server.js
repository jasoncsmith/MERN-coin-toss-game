import mongoose from 'mongoose'
import app from './app.js'
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`)))
  .catch(error => console.log(error.message))
