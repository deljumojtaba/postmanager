
const mongoose = require('mongoose')
const mongooseOptions = {
  keepAlive: 300000,
  connectTimeoutMS: 30000
}
require('./models/user.model')
const bcrypt = require('bcrypt')

module.exports = {
  User: mongoose.model('authUsers'),
  async comparePassword (password, hash) {
    try {
      await bcrypt.compare(password, hash)
    } catch (error) {
      throw error
    }
  },
  connect () {
    mongoose.connect("mongodb://localhost:27017/crud", mongooseOptions)
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log(err))
  }
}
