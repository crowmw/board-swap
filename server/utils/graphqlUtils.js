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
  },
  isAdmin: next => (root, args, context, info) => {
    console.log(context)
    if (context.role !== 'admin') {
      throw new Error('Access denied! You have no permissions.')
    }

    return next(root, args, context, info)
  },
  isModerator: next => (root, args, context, info) => {
    if (context.role === 'moderator' || context.role === 'admin') {
      return next(root, args, context, info)
    }

    throw new Error('Access denied! You have no permissions.')
  }
}