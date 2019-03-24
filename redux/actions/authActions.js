import Router from 'next/router'
import {
  SIGNED_IN,
  SIGN_OUT,
  SIGN_IN_ERROR,
  SIGNING_IN,
  SIGNED_UP,
  SIGN_UP_ERROR,
  SIGNING_UP,
  EMAIL_CONFIRMED_ERROR,
  EMAIL_CONFIRMED
} from '../types'
import { setCookie, removeCookie } from '../../lib/cookie'
import api from '../../lib/api'

//  get token from the api and stores it in the redux store and in cookie then return to main page
const signIn = ({ email, password }) => async dispatch => {
  try {
    dispatch({
      type: SIGNING_IN
    })

    const result = await api.post('api/signin', { email, password })
    if (result) {
      if (!result.profile.emailConfirmed) {
        Router.push('/check-email')
        return
      }

      setCookie('token', result.token)

      dispatch({
        type: SIGNED_IN,
        payload: { ...result }
      })

      Router.push('/')
    }
  } catch (err) {
    dispatch({
      type: SIGN_IN_ERROR,
      payload: { error: err.message }
    })
  }
}

const signUp = ({ email, password, username }) => async dispatch => {
  try {
    dispatch({ type: SIGNING_UP })
    if (typeof email === 'string' && typeof password === 'string') {
      // trim fields
      const userEmail = email.trim()
      const userUsername = username.trim()
      const userPassword = password.trim()

      // Check for email && password length
      if (userEmail.length > 0 && userPassword.length > 0) {
        const result = await api.post('api/signup', {
          email: userEmail,
          password: userPassword,
          username: userUsername
        })
        if (result) {
          dispatch({
            type: SIGNED_UP
          })
          Router.push('/check-email')
        }
      } else {
        throw new Error("Email & Password Field shouldn't be empty")
      }
    } else {
      throw new Error('Email & Password Field Required!')
    }
  } catch (err) {
    console.error(err)
    dispatch({
      type: SIGN_UP_ERROR,
      payload: { error: err.message }
    })
  }
}

//  set token to cookie and state again
const reauthenticate = token => {
  return dispatch => {
    dispatch({ type: SIGNED_IN, payload: { token } })
  }
}

//  remove token from cookie and from state then return to main page
const signout = () => {
  return dispatch => {
    removeCookie('token')
    dispatch({ type: SIGN_OUT })
    Router.push('/')
  }
}

const emailConfirm = ({ username, token }) => async disaptch => {
  try {
    const result = await api.post('api/email-confirm', { username, token })
    if (result) {
      disaptch({ type: EMAIL_CONFIRMED })
    }
  } catch (err) {
    disaptch({ type: EMAIL_CONFIRMED_ERROR, payload: { error: err.message } })
  }
}

const resendEmailVerification = userId => async () => {
  try {
    await api.post('api/email-resend', { userId })
  } catch (err) {
    console.error(err)
  }
}

const sendForgottenPasswordEmail = email => async () => {
  try {
    await api.post('/api/forgot-password', { email })
  } catch (err) {
    console.error(err)
  }
}

const changeForgottenPassword = ({ password, token }) => async () => {
  try {
    console.log('ACTION_PROPS', password, token)
    await api.post('/api/change-forgotten-password', { password, token })
    Router.push('/signin')
  } catch (err) {
    console.error(err)
  }
}

export default {
  signIn,
  signUp,
  reauthenticate,
  signout,
  emailConfirm,
  resendEmailVerification,
  sendForgottenPasswordEmail,
  changeForgottenPassword
}
