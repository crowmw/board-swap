const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD
  }
})

module.exports = {
  sendEmailVerification: async ({ to, username, token }) => {
    const confirmEmailLink = process.env.APP_URL
      ? `${process.env.APP_URL}/email-verification?username=${username}&t=${token}`
      : `http://localhost:3000/email-verification?username=${username}&t=${token}`

    const mailOptions = {
      from: process.env.MAILER_ADDRESS,
      to,
      subject: 'Board Swap - email verification link',
      html: `<p>Click <a href="${confirmEmailLink}">HERE</a> to verify Your email address on Board Swap</p>`
    }

    try {
      await transporter.sendMail(mailOptions)
    } catch (err) {
      throw new Error(err.message)
    }
  },
  sendForgottenPasswordEmail: async ({ to, username, token }) => {
    const changePasswordLink = `${process.env.APP_URL || `http://localhost:3000/`}forgot-password-change?t=${token}`

    const mailOptions = {
      from: process.env.MAILER_ADDRESS,
      to,
      subject: 'Board Swap - forgotten password change',
      html: `<p>Click <a href="${changePasswordLink}">HERE</a> to change Yout forgotten password on Board Swap</p>`
    }

    try {
      await transporter.sendMail(mailOptions)
    } catch (err) {
      throw new Error(err.message)
    }
  },
  passwordChange: async ({ to, username }) => {
    const mailOptions = {
      from: process.env.MAILER_ADDRESS,
      to,
      subject: 'Board Swap - password has been changed',
      html: `<p>${username}! Your password on Board Swap has been changed!</p>`
    }

    try {
      await transporter.sendMail(mailOptions)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}