module.exports = {
  prepareId: (o) => {
    o._id = o._id.toString()
    return o
  },
  authenticated: next => (root, args, context, info) => {
    if (!context.isAuth) {
      throw new Error('Not Authenticated!')
    }

    return next(root, args, context, info)
  }
}