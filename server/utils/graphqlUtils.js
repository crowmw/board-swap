module.exports = {
  prepareId: (o) => {
    o._id = o._id.toString()
    return o
  },
  authorized: (root, args, context) => {
    return new Promise((resolve, reject) => {
      if (context.user) {
        return resolve(prepareId(context.user))
      }

      return reject('Not Authenticated!')
    })
  }
}