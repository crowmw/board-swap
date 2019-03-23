import Router from 'next/router'
import { getCookie } from './cookie'
import { reauthenticate } from '../redux/actions/authActions'
import redirectTo from './redirectTo';

export default (ctx) => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const token = getCookie('token', ctx.req)
      ctx.store.dispatch(reauthenticate(token))
    }
    else {
      if (ctx.res && ctx.res.writeHead) {
        if (!allowUnauthorized(ctx)) {
          redirectTo('/signin', { res: ctx.res, status: 301 })
        }
      }
    }
  } else {
    const state = ctx.store.getState()
    const token = state.authentication.token
    if (!token && !allowUnauthorized(ctx)) {
      Router.push('/signin')
    }
  }
}

const allowUnauthorized = (ctx) => {
  if (ctx.pathname === '/' || ctx.pathname === '/signin' || ctx.pathname === '/signup') {
    return true
  }
  return false
}