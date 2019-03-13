module.exports = (server) => {
  server.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}
