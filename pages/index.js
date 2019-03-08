import React from 'react'
import Link from 'next/link'

import withData from '../lib/withData'
import checkLoggedIn from '../lib/checkLoggedIn'

class Index extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    return {
      user: loggedInUser.profile
    }
  }

  render() {
    const { user } = this.props
    if (user) {
      return (
        <div>
          <h1> Hello {user.email}! </h1>
          <br />
          <a href="/connect/github">Link Account With GitHub</a>
          <br />
          <a href="/logout">Logout</a>
          <br />
          <Link href="/profile">
            <a>Go to Profile</a>
          </Link>
        </div>
      )
    }

    return (
      <div>
        <h1> Auth Example with Next.js and Apollo </h1>
        <Link href="/login">
          <a>Login</a>
        </Link>{' '}
        or{' '}
        <Link href="/signup">
          <a>Signup</a>
        </Link>{' '}
        to view hidden resources
        <br /> <br />
        <a href="/auth/github">Auth With GitHub</a>
      </div>
    )
  }
}

export default withData(Index)
