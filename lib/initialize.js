import Router from 'next/router'
import { getCookie } from './cookie'
import { reauthenticate } from '../redux/actions/authActions'

export default (ctx) => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      ctx.store.dispatch(reauthenticate(getCookie('token', ctx.req)))
    }
  } else {
    const state = ctx.store.getState()
    const token = state.authentication.token

    if (token && (ctx.pathname === '/signin' || ctx.pathname === 'signup')) {
      setTimeout(() => {
        Router.push('/')
      }, 0)
    }
  }
}