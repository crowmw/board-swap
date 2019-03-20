import Router from 'next/router'
import axios from 'axios'
import { SIGNED_IN, SIGN_OUT, SIGN_IN_ERROR, SIGNING_IN, SIGNED_UP, SIGN_UP_ERROR, SIGNING_UP } from '../types'
import { setCookie, removeCookie } from '../../lib/cookie'

//get token from the api and stores it in the redux store and in cookie then return to main page
export const signin = ({ email, password }, type) => async dispatch => {
  try {
    dispatch({
      type: SIGNING_IN
    })
    const body = {
      query: `
        mutation {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
            role
          }
        }
      `
    }
    const result = await axios.post('http://localhost:3000/graphql', body)
    if (!!result.data.errors) throw new Error(result.data.errors[0].message)
    if (result && result.data.data) {
      const data = result.data.data.login

      setCookie('token', data.token)

      Router.push('/')

      dispatch({
        type: SIGNED_IN,
        payload: { ...data }
      })

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
        const body = {
          query: `
          mutation {
            createUser(email: "${email}", password: "${password}", username: "${username}") {
              _id
            }
          }
        `
        }

        const result = await axios.post('http://localhost:3000/graphql', body)
        if (!!result.data.errors) throw new Error(result.data.errors[0].message)

        if (result && result.data.data) {
          Router.push('/')
          dispatch({
            type: SIGNED_UP,
          })
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

export const verifyEmail = ({ username, token }) => async disaptch => {
  try {
    const body = {
      query: `
        mutation {
          verifyEmail(username: "${username}", token: "${token}")
        }
      `
    }

    const result = await axios.post('http://localhost:3000/graphql', body)
    if (!!result.data.errors) throw new Error(result.data.errors[0].message)
    if (result && result.data.data) {
    }
  } catch (err) {
    console.error(err)
  }
}

export const resendEmailVerification = (userId) => async dispatch => {
  try {
    const body = {
      query: `
        mutation {
          resendEmailVerification(userId: String!)
        }
      `
    }

    const result = await axios.post('http://localhost:3000/graphql', body)
    if (!!result.data.errors) throw new Error(result.data.errors[0].message)

    if (result && result.data.data) {

    }
  } catch (err) {
    console.error(err)
  }
}

export default {
  signin,
  signup,
  reauthenticate,
  signout,
  verifyEmail
}
