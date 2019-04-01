const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const emailService = require('../services/emailService')

module.exports = {
  signIn: async (email, password) => {
    try {
      const user = await User.findOne({ email: email })
      if (!user) throw new Error('User does not exists!')

      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual) throw new Error('Password is incorrect!')

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '999h' }
      )

      return { userId: user._id.toString(), token: token, tokenExpiration: 999, role: user.role, profile: user }
    } catch (err) {
      throw err
    }
  },
  signUp: async (email, password, username) => {
    try {
      const existingUser = await User.findOne({ email: email })
      if (existingUser) throw new Error('Email address already taken.')

      const hashedPassword = await bcrypt.hash(password, 12)
      const emailToken = await bcrypt.hash(email, 12)
      const user = new User({
        email,
        password: hashedPassword,
        username,
        role: 'user',
        emailToken,
        emailConfirmed: false,
        bggUsername: null,
        city: null,
        lat: null,
        long: null
      })

      await user.save()

      //SEND EMAIL CONFIRMATION WITH _ID AND EMAILTOKEN
      emailService.sendEmailVerification({ to: email, token: emailToken, username })

      return user
    } catch (err) {
      throw err
    }
  },
  emailConfirm: async (username, token) => {
    try {
      const user = await User.findOne({ username: username })
      if (!user) throw new Error('User not exist')

      if (user.emailToken !== token) throw new Error('Token is not equal to sended.')

      const isEqual = await bcrypt.compare(user.email, token)

      if (!isEqual) throw new Error('Invalid token')

      user.emailConfirmed = true
      user.emailToken = null
      await user.save()
      return true
    } catch (err) {
      throw err
    }
  },
  resendEmailVerification: async userId => {
    try {
      const user = await User.findById(userId)
      if (!user) throw new Error('User not exists')

      const emailToken = await bcrypt.hash(email, 12)

      user.emailToken = emailToken
      await user.save()

      emailService.sendEmailVerification({ to: user.email, token: emailToken, username: user.username })

      return true
    } catch (err) {
      throw new Error(err.message)
    }
  },
  forgotPassword: async email => {
    try {
      const user = await User.findOne({ email: email })
      if (!user) throw new Error('User not exists')

      const forgotPasswordToken = await bcrypt.hash(email, 12)

      user.forgotPasswordToken = forgotPasswordToken
      await user.save()

      emailService.sendForgottenPasswordEmail({ to: user.email, token: forgotPasswordToken, username: user.username })

      return true
    } catch (err) {
      throw new Error(err.message)
    }
  },
  changeForgottenPassword: async (password, token) => {
    try {
      if (!token) throw new Error('Token must be provided')
      if (!password) throw new Error('Password must be provided')

      const user = await User.findOne({ forgotPasswordToken: token })
      if (!user) throw new Error('Cannot find user')

      const hashedPassword = await bcrypt.hash(password, 12)

      user.password = hashedPassword
      user.forgotPasswordToken = null

      await user.save()

      emailService.passwordChange({ to: user.email, username: user.username })
    } catch (err) {
      throw new Error(err.message)
    }
  }
}