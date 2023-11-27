const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

//! static user register logic method:
userSchema.statics.register = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough')
  }

  const exists = await this.findOne({email})

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({email, password: hash})

  return user
}

//! static user login logic method:
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const existingUser = await this.findOne({email})

  if (!existingUser) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, existingUser.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return existingUser
}

module.exports = mongoose.model('User', userSchema)
