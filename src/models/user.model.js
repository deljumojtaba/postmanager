const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const userSchema = new mongoose.Schema({
  firstName: {
      type: String,
      required: false,
      trim: true
  },
  lastName:{
      type: String,
      required: false,
      trim: true
  },
  username: {
      type: String,
      unique: true,
      required: true,
      trim: true
  },
  mobile: {
      type: Number,
      trim:true
  },
  email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
          if (!validator.isEmail(value)) {
              throw new Error('Email is invalid')
          }
      }
  },
  password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
          if (value.toLowerCase().includes('password')) {
              throw new Error('Password cannot contain "password"')
          }
      }
  },
  sex:{
      enum: ['male', 'famale']
       
  },
  role: {
      type: String,
      required: true,
      enum: ['bloger', 'admin']
  },
  
  avatar: {
      type: String
  }
}, {
  timestamps: true
})



// Encrypt password before saving to database
userSchema.pre('save', function(next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, 10, (error, hash) => {
      if (error) {
        return next(error)
      }
      user.password = hash
      next()
    })
  } else {
    return next()
  }
})

mongoose.model('authUsers', userSchema)
