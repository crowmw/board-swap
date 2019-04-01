module.exports = (server, app) => {
  server.get('/board-game/:slug', (req, res) => {
    const actualPage = '/board-game'
    const queryParams = { slug: req.params.slug }
    app.render(req, res, actualPage, queryParams)
  })
}