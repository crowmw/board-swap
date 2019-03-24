import Router from 'next/router'
import { getCookie } from './cookie'
import actions from '../redux/actions/authActions'
import redirectTo from './redirectTo'

const allowUnauthorized = ctx => {
  if (ctx.pathname === '/' || ctx.pathname === '/signin' || ctx.pathname === '/signup') {
    return true
  }
  return false
}

export default ctx => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const token = getCookie('token', ctx.req)
      ctx.store.dispatch(actions.reauthenticate(token))
    } else if (ctx.res && ctx.res.writeHead) {
      if (!allowUnauthorized(ctx)) {
        redirectTo('/signin', { res: ctx.res, status: 301 })
      }
    }
  } else {
    const state = ctx.store.getState()
    const { token } = state.authentication
    if (!token && !allowUnauthorized(ctx)) {
      Router.push('/signin')
    }
  }
}
