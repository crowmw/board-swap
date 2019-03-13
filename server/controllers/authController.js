const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  login: async (email, password) => {
    try {
      const user = await User.findOne({ email: email })
      if (!user) throw new Error('User does not exists!')

      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual) throw new Error('Password is incorrect!')

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '999h' }
      )

      return { userId: user._id.toString(), token: token, tokenExpiration: 999 }
    } catch (err) {
      throw err
    }
  },
  createUser: async (email, password) => {
    try {
      const existingUser = await User.findOne({ email: email })
      if (existingUser) throw new Error('Email address already taken.')

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({
        email: email,
        password: hashedPassword
      })

      const result = await user.save()

      return { ...result._doc, password: null, _id: result._id }
    } catch (err) {
      throw err
    }
  }
}