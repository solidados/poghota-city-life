const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    requires: true,
    unique: true,
  },
  password: {
    type: String,
    requires: true,
  }
})

// * static register method (to be used in userController):
userSchema.statics.register = async function (email, password) {

  // validation of email and password:
  if (!email || !password) { throw Error('All fields must be filled') }
  if (!validator.isEmail(email)) { throw Error('Email is not valid') }
  if (!validator.isStrongPassword(password)) { throw Error('Password is not strong enough') }

  // check if email already exists in DB:
  const exists = await this.findOne({ email })
  if (exists) { throw Error('Email already in use') }

  // encrypt the password:
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user;
}

module.exports = mongoose.model('User', userSchema)
