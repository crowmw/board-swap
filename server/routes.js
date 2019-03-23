const authController = require('./controllers/authController')

module.exports = (server) => {
  server.post('/api/signin', async (req, res) => {
    try {
      const result = await authController.signIn(req.body.email, req.body.password)
      return res.send(result)
    } catch (err) {
      return res.status(401).send(err.message)
    }
  })
}
