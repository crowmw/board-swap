import React, { Component } from 'react'
import AuthContext from './authContext'
import { graphql } from 'react-apollo'
import withData from '../lib/withData'
import gql from 'graphql-tag'

class AuthProvider extends Component {
  state = {
    token: null,
    tokenExpiration: null,
    role: null,
    userId: null,
  }

  login = (email, password) => {
    return new Promise((resolve, reject) => {
      debugger
      if (typeof email === 'string' && typeof password === 'string') {

        email = email.trim()
        password = password.trim()

        if (email.length > 0 && password.length > 0) {
          this.props
            .mutate({
              variables: {
                email,
                password
              }
            })
            .then((res) => {
              console.log(res.data.login)
              setCookie('login-data', res.data.login)
              this.setState({ token: res.data.login.token, tokenExpiration: res.data.login.tokenExpiration, role: res.data.login.role, userId: res.data.login.userId })
              return resolve(res.data.login)
            })
            .catch(({ graphQLErrors: err }) => {
              return reject(err[0].message)
            }
            )
        }
      }
    })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const mutator = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			userId
			token
			tokenExpiration
			role
		}
	}
`

export const AuthConsumer = AuthContext.Consumer;
export default withData(graphql(mutator)(AuthProvider))