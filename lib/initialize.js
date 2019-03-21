import Router from 'next/router'
import { getCookie } from './cookie'
import { reauthenticate } from '../redux/actions/authActions'
import redirectTo from './redirectTo';

export default (ctx) => {
  console.log('PATHNAME', ctx.pathname)
  if (ctx.isServer) {
    console.log('IS_SERVER')
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
    console.log('IS_CLIENT')
    const state = ctx.store.getState()
    const token = state.authentication.token
    if (!token && !allowUnauthorized(ctx)) {
      // setTimeout(() => {
      Router.push('/signin')
      // }, 0)
    }
  }
}

const allowUnauthorized = (ctx) => {
  if (ctx.pathname === '/' || ctx.pathname === '/signin' || ctx.pathname === '/signup') {
    return true
  }
  return false
}