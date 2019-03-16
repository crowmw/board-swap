import Router from 'next/router'
import axios from 'axios'
import { AUTHENTICATE, DEAUTHENTICATE } from '../types'
import { setCookie, removeCookie } from '../../lib/cookie'

//get token from the api and stores it in the redux store and in cookie
export const authenticate = ({ email, password }, type) => {
  return async dispatch => {
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
    try {
      const result = await axios.post('http://localhost:3000/graphql', body)
      if (!!result.data.errors) throw new Error(result.data.errors[0])
      if (result && result.data.data) {
        const data = result.data.data.login

        setCookie('token', data.token)

        Router.push('/')

        dispatch({
          type: AUTHENTICATE,
          payload: { ...data }
        })
      }
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }
}

export const reauthenticate = (token) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, payload: { token } })
  }
}

export const deauthenticate = () => {
  return dispatch => {
    removeCookie('token')
    Router.push('/')
    dispatch({ type: DEAUTHENTICATE })
  }
}

export default {
  authenticate,
  reauthenticate,
  deauthenticate
}
