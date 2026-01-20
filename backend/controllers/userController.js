const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// * creating a jwt token for the user:
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' })
}

// * login user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create token:
    const token = createToken(user.id)

    res.status(200).json({ email, token })
  }
  catch (e) {
    res.status(400).json({ error: e.message })
  }
}

// * register user
const registerUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.register(email, password)

    // create token:
    const token = createToken(user.id)

    res.status(200).json({ email, token })
  }
  catch (e) {
    res.status(400).json({ error: e.message })
  }
}

module.exports = { loginUser, registerUser }
