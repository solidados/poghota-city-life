const User = require('../models/userModel')

// * login user
const loginUser = async (req, res) => {
  res.json({ mssg: 'User logged in' })
}

// * register user
const registerUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.register(email, password)

    res.status(200).json({ email, user })
  }
  catch (e) {
    res.status(400).json({ error: e.message })
  }
}

module.exports = { loginUser, registerUser }
