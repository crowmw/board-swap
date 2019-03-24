const authController = require('./controllers/authController')

module.exports = (server) => {
  server.post('/api/signin', async ({ body: { email, password } }, res) => {
    try {
      const result = await authController.signIn(email, password)
      return res.send(result)
    } catch (err) {
      return res.status(403).send(err.message)
    }
  }),
    server.post('/api/signup', async ({ body: { email, password, username } }, res) => {
      try {
        const result = await authController.signUp(email, password, username)
        return res.send(result)
      } catch (err) {
        return res.status(403).send(err.message)
      }
    }),
    server.post('/api/email-confirm', async ({ body: { username, token } }, res) => {
      try {
        const result = await authController.emailConfirm(username, token)
        return res.send(result)
      } catch (err) {
        return res.status(400).send(err.message)
      }
    }),
    server.post('/api/email-resend', async ({ body: { userId } }, res) => {
      try {
        const result = await authController.resendEmailVerification(userId)
        return res.send(result)
      } catch (err) {
        return res.status(500).send(err.message)
      }
    }),
    server.post('/api/forgot-password', async ({ body: { email } }, res) => {
      try {
        const result = await authController.forgotPassword(email)
        return res.send(result)
      } catch (err) {
        return res.status(500).send(err.message)
      }
    }),
    server.post('/api/change-forgotten-password', async ({ body: { password, token } }, res) => {
      try {
        if (!token) throw new Error('Token is not provided')
        const result = await authController.changeForgottenPassword(password, token)
        return res.send(result)
      } catch (err) {
        return res.status(400).send(err.message)
      }
    })
}
