module.exports = (server) => {
  server.get('/logout', (req, res) => {
    res.redirect('/')
  })
}
