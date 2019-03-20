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
    const mailOptions = {
      from: process.env.MAILER_ADDRESS,
      to,
      subject: 'Board Swap email verification link',
      html: `<p>Click <a href="http://localhost:3000/email-verification?username=${username}&t=${token}">HERE</a> to verify Your email address on Board Swap</p>`
    }

    try {
      const result = await transporter.sendMail(mailOptions)
      if (result) {
        console.log(result)
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }
}