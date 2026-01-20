const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const validator = require('validator')
const sequelize = require('../config/database')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
})

// * REGISTER USER: static register method (to be used in userController):
User.register = async function (email, password) {

  // validation of email and password:
  if (!email || !password) { throw Error('All fields must be filled') }
  if (!validator.isEmail(email)) { throw Error('Email is not valid') }
  if (!validator.isStrongPassword(password)) { throw Error('Password is not strong enough') }

  // check if email already exists in DB:
  const exists = await this.findOne({ where: { email } })
  if (exists) { throw Error('Email already in use') }

  // encrypt the password:
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user;
}

// * LOGIN USER: static login method (to be used in userController):
User.login = async function (email, password) {

  // check of email and password fields to be filled:
  if (!email || !password) { throw Error('All fields must be filled') }

  // find current user in DB:
  const user = await this.findOne({ where: { email } })
  if (!user) { throw Error('Incorrect email') }

  // checks if passwords match (comparing current userPassword and userHashed in DB):
  const match = await bcrypt.compare(password, user.password)
  if (!match) { throw Error('Incorrect password') }

  return user
}

module.exports = User
