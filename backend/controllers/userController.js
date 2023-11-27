const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// * creating a jwt token for the user:
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// * login user
const loginUser = async (req, res) => {
  res.json({ mssg: 'User logged in' })
}

// * register user
const registerUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.register(email, password)

    // create token:
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  }
  catch (e) {
    res.status(400).json({ error: e.message })
  }
}

module.exports = { loginUser, registerUser }
