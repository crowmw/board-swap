import React from 'react'
import Link from 'next/link'

import { connect } from 'react-redux'
import initialize from '../lib/initialize'

import selector from '../redux/selectors/selectors'
import actions from '../redux/actions/actions'

class Index extends React.Component {
  signoutHandler = () => {
    this.props.signout()
  }

  //should return signin / signup pages
  render() {
    const { signedIn } = this.props
    if (signedIn) {
      return (
        <div>
          <h1> Hello! </h1>
          <a href='#' onClick={this.signoutHandler}>Logout</a>
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
        <Link href="/signin">
          <a>Sign In</a>
        </Link>{' '}
        or{' '}
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>{' '}
        <Link href="/profile">
          <a>Profile</a>
        </Link>{' '}
        to view hidden resources
      </div>
    )
  }
}

const mapStateToProps = state => ({
  signedIn: selector.getIsSignedIn(state)
})

export default connect(mapStateToProps, actions)(Index)
