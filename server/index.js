const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const next = require('next')
const authMiddleware = require('./middlewares/authMiddleware')

require('dotenv').config()

const schema = require('./data/schema')

mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth', {
  useNewUrlParser: true
})

const port = process.env.PORT || 3000

const dev = process.env.NODE_ENV !== 'production'

const app = next({
  dev
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(authMiddleware)

  server.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress((req) => ({
      schema,
      context: {
        isAuth: req.isAuth,
        userId: req.userId
      }
    })
    )
  )

  server.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    })
  )

  require('./routes')(server)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // Start express server
  server.listen(port, () =>
    console.log('> GraphQL Server Listening on Port', port)
  )
})
