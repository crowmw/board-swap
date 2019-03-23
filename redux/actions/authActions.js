import Router from 'next/router'
import axios from 'axios'
import { SIGNED_IN, SIGN_OUT, SIGN_IN_ERROR, SIGNING_IN, SIGNED_UP, SIGN_UP_ERROR, SIGNING_UP, EMAIL_CONFIRMED_ERROR, EMAIL_CONFIRMED } from '../types'
import { setCookie, removeCookie } from '../../lib/cookie'
import api from '../../lib/api';

//get token from the api and stores it in the redux store and in cookie then return to main page
export const signin = ({ email, password }) => async dispatch => {
  try {
    dispatch({
      type: SIGNING_IN
    })
    const body = `
        mutation {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
            role
            profile {
                username
                email
                emailConfirmed
                verified
                city
                role
                bggUsername
            }
          }
        }
      `
    const result = await api.post('/api/signin', { email, password })
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

export const signup = ({ email, password, username }) => async dispatch => {
  try {
    dispatch({ type: SIGNING_UP })
    if (typeof email === 'string' && typeof password === 'string') {
      // trim fields
      email = email.trim()
      username = username.trim()
      password = password.trim()

      // Check for email && password length
      if (email.length > 0 && password.length > 0) {
        const body = `
          mutation {
            createUser(email: "${email}", password: "${password}", username: "${username}") {
              _id
            }
          }
        `

        const result = await api.graphql(body)
        if (result) {
          dispatch({
            type: SIGNED_UP,
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

//set token to cookie and state again
export const reauthenticate = (token) => {
  return dispatch => {
    dispatch({ type: SIGNED_IN, payload: { token } })
  }
}

//remove token from cookie and from state then return to main page
export const signout = () => {
  return dispatch => {
    removeCookie('token')
    dispatch({ type: SIGN_OUT })
    Router.push('/')
  }
}

export const emailConfirm = ({ username, token }) => async disaptch => {
  try {
    const body = `
        mutation {
          emailConfirm(username: "${username}", token: "${token}")
        }
      `

    const result = await api.graphql(body)
    if (result) {
      disaptch({ type: EMAIL_CONFIRMED })
    }
  } catch (err) {
    disaptch({ type: EMAIL_CONFIRMED_ERROR, payload: { error: err.message } })
  }
}

export const resendEmailVerification = (userId) => async dispatch => {
  try {
    const body = `
        mutation {
          resendEmailVerification(userId: String!)
        }
      `

    const result = await api.graphql(body)
  } catch (err) {
    console.error(err)
  }
}

export default {
  signin,
  signup,
  reauthenticate,
  signout,
  emailConfirm
}
